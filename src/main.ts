import { fork } from "child_process";

fork(`${__dirname}/UDPSonar.js`);
fork(`${__dirname}/WebsocketServer.js`);
fork(`${__dirname}/FrontendServer.js`);
