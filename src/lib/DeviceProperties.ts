import * as fs from "fs";

export class DeviceProperties {
    private MODEL_FNAME = "/proc/device-tree/model";
    private OS_V_FNAME = "/etc/os-release";
    private DIR_PATH = "/etc/rpicontrol";
    private DEVICE_NAME_FNAME = "devicecredname.conf";
    private DEVICE_PWD_FNAME = "devicecredpwd.conf";

    getDeviceModel(): string {
        let result = "Unknown device";
        if (fs.existsSync(this.MODEL_FNAME))
            result = fs.readFileSync(this.MODEL_FNAME).toString();
        else
            console.error('Access deny! path: ' + this.MODEL_FNAME);
        return result;
    }

    getOsVersion(): string {
        let version = "Unknown Linux";
        if (fs.existsSync(this.OS_V_FNAME)) {
            version = fs.readFileSync(this.OS_V_FNAME).toString();
            const raw = version.split("\n")[0].split("=")[1];
            version = raw.substring(1, raw.length - 1);
        }
        return version;
    }

    getDeviceName(): string {
        if (!fs.existsSync(this.DIR_PATH)) fs.mkdirSync(this.DIR_PATH);
        const deviceName = this.DIR_PATH + "/" + this.DEVICE_NAME_FNAME;
        if (!fs.existsSync(deviceName)) fs.writeFileSync(deviceName, "Raspberry");
        return fs.readFileSync(deviceName).toString();
    }

    setDeviceName(name: string): void {
        if (!fs.existsSync(this.DIR_PATH)) fs.mkdirSync(this.DIR_PATH);
        const deviceName = this.DIR_PATH + "/" + this.DEVICE_NAME_FNAME;
        fs.closeSync(fs.openSync(deviceName, 'w'));
        fs.writeFileSync(deviceName, name);
    }

    authUser(pwd: string): boolean {
        if (!fs.existsSync(this.DIR_PATH)) fs.mkdirSync(this.DIR_PATH);
        const pwdName = this.DIR_PATH + "/" + this.DEVICE_PWD_FNAME;
        if (!fs.existsSync(pwdName)) {
            fs.closeSync(fs.openSync(pwdName, 'w'));
            return true;
        } else
            return (pwd === fs.readFileSync(pwdName).toString());

    }

    setNewPwd(oldPwd: string, newPwd: string): boolean {
        if (!fs.existsSync(this.DIR_PATH)) fs.mkdirSync(this.DIR_PATH);
        const pwdName = this.DIR_PATH + "/" + this.DEVICE_PWD_FNAME;
        if (!fs.existsSync(pwdName)) {
            fs.closeSync(fs.openSync(pwdName, 'w'));
            fs.writeFileSync(pwdName, newPwd);
            return true;
        } else if (oldPwd === fs.readFileSync(pwdName).toString()) {
            fs.closeSync(fs.openSync(pwdName, 'w'));
            fs.writeFileSync(pwdName, newPwd);
            return true;
        }
        return false;
    }
}