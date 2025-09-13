# Node Server

A simple static content web server for Node on Linux.

Original source code can be found at [MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Node_server_without_framework).

## Minor revisions

1. I prepended a shebang `#!/usr/bin/env node` so the js file can be executed directly (`./node-server.js`.)
2. There is a `static` folder containing simple `index` and `404` html files (and favicon) by way of example content.
3. An alternative content folder (`public`) is also supplied for testing.
4. Added Command-line switch processing.

## Command-Line Switches

The switches take the form `-S=V`, where `S` is the switch and `V` is the value (string.)

| Switch | Purpose        | Deault   |
| ------ | -------------- | -------- |
| P      | Port number    | 8000     |
| R      | Roor directory | ./static |
