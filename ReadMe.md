# Node Server

A simple static content web server for Node on Linux, extended to support API interaction using my [client-api](https://github.com/TracyGJG/client-api).

N.B. This project is alright for demos, prototypes and testing, but not production. Alternative products to consider include:

- Mock Service Worker [(MSW)](https://mswjs.io/) - API endpoints
- [HTTP-Server](https://www.npmjs.com/package/http-server) - Static content server.
- [JSON-server](https://www.npmjs.com/package/json-server) - API endpoints and static content server.

Original source code can be found at [MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Node_server_without_framework), and uis similar to the example on the [Node.js](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs) web site.

## Minor revisions

1. I prepended a shebang `#!/usr/bin/env node` so the js file can be executed directly (`./node-server.js`.)
2. There is a `static` folder containing simple `index` and `404` html files (and favicon) by way of example web content.
3. An alternative (`public`) folder is also supplied for testing with an API interface.
4. Loading configuration data from an optional `config.json` file

## Configuration file values

The configuration file is in JSON format and contains an object with the following properties.

| Property | Purpose                   | Deault   |
| -------- | ------------------------- | -------- |
| API      | Path to the API data file | NONE     |
| PORT     | Port number               | 8000     |
| ROOT     | Root directory            | ./static |
