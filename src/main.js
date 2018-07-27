"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
child_process_1.fork(`${__dirname}/UDPSonar.js`);
child_process_1.fork(`${__dirname}/WebsocketServer.js`);
child_process_1.fork(`${__dirname}/FrontendServer.js`);
//# sourceMappingURL=main.js.map