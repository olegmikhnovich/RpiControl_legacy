import { execSync } from "child_process";

export class Connectivity {
    static getEthernetConnection(): object {
        const data = execSync('ifconfig').toString().split('\n');
        const interfaces = Connectivity.getInterfacesList(data);
        const eth = interfaces.find(x => x.includes('eth'));
        if (eth !== undefined) {
            const ethData = execSync(`ifconfig ${eth}`).toString().split('\n');
            return {
                name: eth,
                status: Connectivity.findConnectStatus(ethData),
                ip: Connectivity.findIpAddress(ethData),
                mac: Connectivity.findMacAddress(ethData),
            };
        } else {
            return null;
        }
    }

    getWifiConnection(): void {
        const data = execSync('ifconfig').toString().split('\n');
        const interfaces = Connectivity.getInterfacesList(data);
    }


    private static getInterfacesList(data: string[]): string[] {
        let interfaces = [];
        for(const row of data) {
            if(Connectivity.count(row) === 1) {
                interfaces.push(row.split(':')[0].trim());
            }
        }
        return interfaces;
    }

    private static findConnectStatus(data: string[]): boolean {
        return (data.findIndex(v => v.toLowerCase().includes('running')) > -1);
    }

    private static findIpAddress(data: string[]): string {
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

    private static findMacAddress(data: string[]): string {
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

    private static count(value: string): number {
        let count = 0;
        let pos = value.indexOf(':');
        while (pos != -1) {
            count++;
            pos = value.indexOf("x",pos+1);
        }
        return count;
    }
}