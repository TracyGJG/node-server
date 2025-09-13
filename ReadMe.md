# Node Server

A simple static content web server for Node on Linux.

Original source code can be found at [MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Node_server_without_framework).

## Minor revisions

1. I prepended a shebang `#!/usr/bin/env node` so the js file can be executed directly (`./node-server.js`.)
2. There is a `static` folder containing simple `index` and `404` html files by way of example content.
3. An alternative content folder (`public`) is supplied for testing.
4. An alternative port number can be supplied using the `-P=` switch, but the default will be port `8000`.
5. An alternative root directory can be supplied using the `-R=` switch, but the default will be `'./static'`.
