#!/usr/bin/env node

import * as fs from 'node:fs';
import * as http from 'node:http';
import * as path from 'node:path';

const MIME_TYPES = {
  default: 'application/octet-stream',
  html: 'text/html; charset=UTF-8',
  js: 'text/javascript',
  css: 'text/css',
  png: 'image/png',
  jpg: 'image/jpeg',
  gif: 'image/gif',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
};

const { PORT, ROOT } = {
  PORT: +(argSwitch('P') || '8000'),
  ROOT: path.join(process.cwd(), argSwitch('R') || './static'),
};

function argSwitch(sw) {
  const re = RegExp(`^-${sw}=`, 'i');
  return process.argv
    .slice(2)
    .find((argv, i) => re.test(argv))
    ?.slice(3);
}

const toBool = [() => true, () => false];

const prepareFile = async (url) => {
  const paths = [ROOT, url];
  url.endsWith('/') && paths.push('index.html');
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(ROOT);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : `${ROOT}/404.html`;
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};

http
  .createServer(async (req, res) => {
    const file = await prepareFile(req.url);
    const statusCode = file.found ? 200 : 404;
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
    res.writeHead(statusCode, { 'Content-Type': mimeType });
    file.stream.pipe(res);
    console.log(`${req.method} ${req.url} ${statusCode}`);
  })
  .listen(PORT);

console.log(`Content server from root folder: "${ROOT}"`);
console.log(`Server running at http://127.0.0.1:${PORT}/`);
