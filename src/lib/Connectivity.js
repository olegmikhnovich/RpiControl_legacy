"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
class Connectivity {
    static getEthernetConnection() {
        const data = child_process_1.execSync('ifconfig').toString().split('\n');
        const interfaces = Connectivity.getInterfacesList(data);
        const eth = interfaces.find(x => x.includes('eth'));
        if (eth !== undefined) {
            const ethData = child_process_1.execSync(`ifconfig ${eth}`).toString().split('\n');
            return {
                name: eth,
                status: Connectivity.findConnectStatus(ethData),
                ip: Connectivity.findIpAddress(ethData),
                mac: Connectivity.findMacAddress(ethData),
            };
        }
        else {
            return null;
        }
    }
    getWifiConnection() {
        const data = child_process_1.execSync('ifconfig').toString().split('\n');
        const interfaces = Connectivity.getInterfacesList(data);
    }
    static getInterfacesList(data) {
        let interfaces = [];
        for (const row of data) {
            if (Connectivity.count(row) === 1) {
                interfaces.push(row.split(':')[0].trim());
            }
        }
        return interfaces;
    }
    static findConnectStatus(data) {
        return (data.findIndex(v => v.toLowerCase().includes('running')) > -1);
    }
    static findIpAddress(data) {
        for (let row of data) {
            const words = row.split(' ');
            for (const w of words) {
                const searchResult = w.search('([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(\\d{1,3}\\.){3}\\d{1,3}');
                if (searchResult === 0) {
                    return w;
                }
            }
        }
        return '';
    }
    static findMacAddress(data) {
        let result = '';
        for (let row of data) {
            const words = row.split(' ');
            for (const w of words) {
                if (w.search('^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$') === 0) {
                    result = w;
                }
            }
        }
        return result;
    }
    static count(value) {
        let count = 0;
        let pos = value.indexOf(':');
        while (pos != -1) {
            count++;
            pos = value.indexOf("x", pos + 1);
        }
        return count;
    }
}
exports.Connectivity = Connectivity;
//# sourceMappingURL=Connectivity.js.map