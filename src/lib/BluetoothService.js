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
    static processData(raw) {
        let data = raw;
        const _data = data.toString().toLowerCase();
        if (_data.includes('chg')) {
            return '';
        }
        else if (!_data.includes('device')) {
            return '';
        }
        return data;
    }
}
exports.BluetoothService = BluetoothService;
//# sourceMappingURL=BluetoothService.js.map