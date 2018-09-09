import { ChildProcess, spawn } from "child_process";

export class BluetoothService {
    private readonly process;

    constructor() {
        this.process = spawn('bluetoothctl');
    }

    public getProcess(): ChildProcess {
        return this.process;
    }

    static processData(raw: string): string {
        let data = raw;
        const _data = data.toString().toLowerCase();
        if (_data.includes('chg')) {
            return '';
        } else if (!_data.includes('device')) {
            return '';
        }
        return data;
    }
}