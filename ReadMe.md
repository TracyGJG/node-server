# Node Server

A simple static content web server for Node on Linux, extended to support API interaction using my [client-api](https://github.com/TracyGJG/client-api).

N.B. This project is alright for demos, prototypes and testing, but not production. Alternative products include:

- Mock Service Worker [(MSW)](https://mswjs.io/) - API endpoints
- [HTTP-Server](https://www.npmjs.com/package/http-server) - Static content server.
- [JSON-server](https://www.npmjs.com/package/json-server) - API endpoints and static content server.

Original source code can be found at [MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Node_server_without_framework), and uis similar to the example on the [Node.js](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs) web site.

## Minor revisions

1. I prepended a shebang `#!/usr/bin/env node` so the js file can be executed directly (`./node-server.js`.)
2. There is a `static` folder containing simple `index` and `404` html files (and favicon) by way of example web content.
3. An alternative (`public`) folder is also supplied for testing with an API interface.
4. Added Command-line switch processing.

## Command-Line Switches

The switches take the form `-S=V`, where `S` is the switch and `V` is the value (string.)

| Switch | Purpose                   | Deault   |
| ------ | ------------------------- | -------- |
| P      | Port number               | 8000     |
| R      | Root directory            | ./static |
| A      | Path to the API data file | NONE     |
