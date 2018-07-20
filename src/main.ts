import { fork } from "child_process";

const udpSonarInstance = fork(`${__dirname}/UDPSonar.js`);
const websocketServerInstance = fork(`${__dirname}/WebsocketServer.js`);
const frontendServerInstance = fork(`${__dirname}/FrontendServer.js`);
