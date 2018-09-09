import { ChildProcess, spawn } from "child_process";

export class BluetoothService {
    private readonly process;

    constructor() {
        this.process = spawn('bluetoothctl');
    }

    public getProcess(): ChildProcess {
        return this.process;
    }

    static processData(raw: string, command: string): string {
        let data = raw;
        const _data = data.toString().toLowerCase();
        if (_data.includes('chg')) {
            return '';
        } else if (!_data.includes('device')) {
            return '';
        }
        const erase = '[0;94m[bluetooth][0m#';
        data = data.toString().replace(erase, '');
        if (!command.includes('scan')) {
            if (_data.includes('new') || _data.length < 23) {
                return '';
            }
        }
        return data;
    }
}