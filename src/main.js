"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const udpSonarInstance = child_process_1.fork(`${__dirname}/UDPSonar.js`);
const websocketServerInstance = child_process_1.fork(`${__dirname}/WebsocketServer.js`);
const frontendServerInstance = child_process_1.fork(`${__dirname}/FrontendServer.js`);
//# sourceMappingURL=main.js.map