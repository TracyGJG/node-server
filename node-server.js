#!/usr/bin/env node

import * as fs from 'node:fs';
import * as http from 'node:http';
import * as path from 'node:path';

const MIME_TYPES = {
  default: 'application/octet-stream',
  json: 'application/json',
  html: 'text/html; charset=UTF-8',
  js: 'text/javascript',
  css: 'text/css',
  png: 'image/png',
  jpg: 'image/jpeg',
  gif: 'image/gif',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
};

let defaultApi = '';
let defaultPort = '8000';
let defaultRoot = '/static';
try {
  const CONFIG = await import('./config.json', { with: { type: 'json' } });
  defaultApi = CONFIG.default.API;
  defaultPort = CONFIG.default.PORT;
  defaultRoot = CONFIG.default.ROOT;
} catch (err) {
  console.warn('No configuration file loaded. Default values applied.');
}

const { API, PORT, ROOT } = {
  API: defaultApi,
  PORT: defaultPort,
  ROOT: path.join(process.cwd(), defaultRoot),
};

let API_DATA;
try {
  API_DATA = API && (await import(API, { with: { type: 'json' } }))?.default;
} catch (err) {
  console.warn(`API data file "${API}" failed to load. Continued with an API.`);
}

const isApi = (req) =>
  API_DATA &&
  req.url.startsWith('/api/') &&
  API_DATA.hasOwnProperty(req.url.split(/\//)[2]);

const getBody = (req, fnCallback) => {
  const data = [];
  req
    .on('data', (datum) => {
      data.push(datum);
    })
    .on('end', () => {
      fnCallback(JSON.parse(Buffer.concat(data).toString()));
    });
};

const processApi = async (req, res) => {
  const [resource, id] = req.url.split(/\//).splice(2);
  const method = req.method;

  if (method === 'POST' && id) {
    res.writeHead(404, { 'Content-Type': MIME_TYPES.html });
    res.write('Error: Bad Request - Post with Id');
    res.end();
    return;
  }
  if (method !== 'GET' && !Array.isArray(API_DATA[resource])) {
    res.writeHead(404, { 'Content-Type': MIME_TYPES.html });
    res.write('Error: Bad Request - Non-Get on Object resource');
    res.end();
    return;
  }

  if (method === 'GET') {
    const data = id
      ? API_DATA[resource].find((entry) => entry.id === id)
      : API_DATA[resource];
    res.writeHead(200, { 'Content-Type': MIME_TYPES.json });
    res.write(JSON.stringify(data));
    res.end();
    return;
  }
  if (method === 'DELETE') {
    const data = API_DATA[resource].filter((entry) => entry.id !== id);
    const statusCode = API_DATA[resource].length === data.length ? 404 : 200;
    API_DATA[resource] = data;
    res.writeHead(statusCode, { 'Content-Type': MIME_TYPES.json });
    res.end(JSON.stringify(null));
    return;
  }
  if (method[0] === 'P') {
    // Get HTTP.Body for POST (create), PUT (create/update), PATCH (partial)
    getBody(req, (body) => {
      let statusCode = 404;
      const _id = id || '' + Date.now();
      const index = API_DATA[resource].findIndex((entry) => entry.id === id);

      const data = {
        ...(id
          ? API_DATA[resource].find((entry) => entry.id === id)
          : { id: _id }),
        ...body,
      };
      if (data) {
        if (method === 'PATCH' || (method === 'PUT' && id)) {
          API_DATA[resource][index] = data;
        } else {
          API_DATA[resource].push(data);
        }
        statusCode = 200;
      }
      res.writeHead(statusCode, { 'Content-Type': MIME_TYPES.json });
      res.write(JSON.stringify(data));
      res.end();
    });
  }
};

const prepareFile = async ({ url }, res) => {
  const toBool = [() => true, () => false];
  const paths = [ROOT, url];
  url.endsWith('/') && paths.push('index.html');
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(ROOT);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : `${ROOT}/404.html`;
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);

  const statusCode = found ? 200 : 404;
  const mimeType = MIME_TYPES[ext] || MIME_TYPES.default;
  res.writeHead(statusCode, { 'Content-Type': mimeType });
  stream.pipe(res);
};

http
  .createServer((req, res) => (isApi(req) ? processApi : prepareFile)(req, res))
  .listen(PORT);

console.log(`\nStatic content folder: "${ROOT}"`);
API_DATA && console.log(`API data source: "${API}"`);
console.log(`\nServer running at http://127.0.0.1:${PORT}/\n`);
