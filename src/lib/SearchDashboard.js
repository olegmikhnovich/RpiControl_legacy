"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dgram = require("dgram");
const DeviceProperties_1 = require("./DeviceProperties");
class SearchDashboard {
    constructor() {
        this.PKG_MASK = "mikhnovich.oleg.rpicontrol";
    }
    startServer() {
        const server = dgram.createSocket('udp4');
        const port = 4822;
        const dp = new DeviceProperties_1.DeviceProperties();
        server.on('listening', () => {
            console.log(`UDP server alive on ${port}.`);
        });
        server.on('message', (msg, info) => {
            if (msg.toString() === this.PKG_MASK) {
                console.log(`Server got: ${msg} from ${info.address}:${info.port}`);
                const dataBuffer = [
                    dp.getDeviceName(),
                    dp.getDeviceModel(),
                    dp.getOsVersion()
                ];
                const response = dataBuffer.join("\n");
                server.send(response, info.port, info.address);
            }
        });
        server.bind(port);
    }
}
exports.SearchDashboard = SearchDashboard;
//# sourceMappingURL=SearchDashboard.js.map