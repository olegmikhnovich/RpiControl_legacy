"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
class AudioControl {
    constructor() {
        this.coefficients = [
            -10238, -10000, -9793, -8736, -7987, -7405, -6930, -6528, -6180, -5875,
            -5600, -5351, -5125, -4915, -4723, -4542, -4375, -4216, -4067, -3926,
            -3793, -3666, -3544, -3429, -3315, -3211, -3104, -3004, -2908, -2815,
            -2726, -2639, -2555, -2475, -2396, -2319, -2245, -2173, -2102, -2033,
            -1966, -1901, -1837, -1775, -1714, -1655, -1597, -1545, -1488, -1450,
            -1425, -1377, -1320, -1271, -1191, -1145, -1105, -1058, -1028, -979,
            -934, -889, -945, -802, -759, -717, -676, -635, -595, -556,
            -517, -479, -441, -404, -397, -351, -303, -285, -245, -205,
            -188, -150, -120, -90, -55, -20, 12, 36, 67, 92,
            136, 165, 192, 218, 248, 268, 302, 318, 355, 375, 400
        ];
    }
    setVolume(value) {
        child_process_1.exec('amixer set PCM -- ' + this.coefficients[value]);
    }
    getVolume() {
        const data = child_process_1.execSync('amixer get PCM');
        const v = +data.toString().split('\n')[4].split(' ')[4];
        for (let i = 0; i < 101; i++) {
            if (Math.abs(this.coefficients[i] - v) <= 10)
                return i;
        }
        return 0;
    }
}
exports.AudioControl = AudioControl;
//# sourceMappingURL=AudioControl.js.map