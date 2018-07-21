"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const child_process_1 = require("child_process");
class DeviceProperties {
    constructor() {
        this.MODEL_FNAME = "/proc/device-tree/model";
        this.OS_V_FNAME = "/etc/os-release";
        this.DIR_PATH = "/etc/rpicontrol";
        this.DEVICE_NAME_FNAME = "devicecredname.conf";
        this.DEVICE_PWD_FNAME = "devicecredpwd.conf";
    }
    getDeviceModel() {
        let result = "Unknown device";
        if (fs.existsSync(this.MODEL_FNAME))
            result = fs.readFileSync(this.MODEL_FNAME).toString();
        else
            console.error('Access deny! path: ' + this.MODEL_FNAME);
        return result;
    }
    getTemperature() {
        const value = child_process_1.execSync('vcgencmd measure_temp').toString();
        return value.split('=')[1];
    }
    getOsVersion() {
        let version = "Unknown Linux";
        if (fs.existsSync(this.OS_V_FNAME)) {
            version = fs.readFileSync(this.OS_V_FNAME).toString();
            const raw = version.split("\n")[0].split("=")[1];
            version = raw.substring(1, raw.length - 1);
        }
        return version;
    }
    getDeviceName() {
        if (!fs.existsSync(this.DIR_PATH))
            fs.mkdirSync(this.DIR_PATH);
        const deviceName = this.DIR_PATH + "/" + this.DEVICE_NAME_FNAME;
        if (!fs.existsSync(deviceName))
            fs.writeFileSync(deviceName, "Raspberry");
        return fs.readFileSync(deviceName).toString();
    }
    setDeviceName(name) {
        if (!fs.existsSync(this.DIR_PATH))
            fs.mkdirSync(this.DIR_PATH);
        const deviceName = this.DIR_PATH + "/" + this.DEVICE_NAME_FNAME;
        fs.closeSync(fs.openSync(deviceName, 'w'));
        fs.writeFileSync(deviceName, name);
    }
    authUser(pwd) {
        if (!fs.existsSync(this.DIR_PATH))
            fs.mkdirSync(this.DIR_PATH);
        const pwdName = this.DIR_PATH + "/" + this.DEVICE_PWD_FNAME;
        if (!fs.existsSync(pwdName)) {
            fs.closeSync(fs.openSync(pwdName, 'w'));
            return true;
        }
        else
            return (pwd === fs.readFileSync(pwdName).toString());
    }
    setNewPwd(oldPwd, newPwd) {
        if (!fs.existsSync(this.DIR_PATH))
            fs.mkdirSync(this.DIR_PATH);
        const pwdName = this.DIR_PATH + "/" + this.DEVICE_PWD_FNAME;
        if (!fs.existsSync(pwdName)) {
            fs.closeSync(fs.openSync(pwdName, 'w'));
            fs.writeFileSync(pwdName, newPwd);
            return true;
        }
        else if (oldPwd === fs.readFileSync(pwdName).toString()) {
            fs.closeSync(fs.openSync(pwdName, 'w'));
            fs.writeFileSync(pwdName, newPwd);
            return true;
        }
        return false;
    }
}
exports.DeviceProperties = DeviceProperties;
//# sourceMappingURL=DeviceProperties.js.map