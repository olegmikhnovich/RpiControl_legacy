"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
class BluetoothService {
    constructor() {
        this.process = child_process_1.spawn('bluetoothctl');
    }
    getProcess() {
        return this.process;
    }
    static processData(raw, command) {
        let data = raw;
        const _data = data.toString().toLowerCase();
        if (_data.includes('chg')) {
            return '';
        }
        else if (!_data.includes('device')) {
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
exports.BluetoothService = BluetoothService;
//# sourceMappingURL=BluetoothService.js.map