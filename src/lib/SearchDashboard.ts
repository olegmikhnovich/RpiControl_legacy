import * as dgram from "dgram";
import { DeviceProperties } from "./DeviceProperties";

export class SearchDashboard {
    private PKG_MASK = "mikhnovich.oleg.rpicontrol";

    startServer(): void {
        const server = dgram.createSocket('udp4');
        const port = 4822;
        const dp = new DeviceProperties();
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