# Node Server

A simple static content web server for Node on Linux.

Original code found at [MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Node_server_without_framework)

## Minor revisions

1. I prepended a shebang `#!/usr/bin/env node` so the js file could be executed directly.
2. There is a `static` folder containing a simple html file by way of example content.
3. An alternative port number can be supplied as the `-P` switch, but the default will be port 8000.
