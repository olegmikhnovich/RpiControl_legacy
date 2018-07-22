"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class FileExplorer {
    constructor() {
        this.HOME_DIR = '/home/pi/';
    }
    getHomeDir() {
        return FileExplorer.getDir(this.HOME_DIR);
    }
    static getDir(currentPath) {
        let data = fs.readdirSync(currentPath);
        let dir = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].charAt(0) !== ('.')) {
                dir.push(data[i]);
            }
        }
        return dir;
    }
}
exports.FileExplorer = FileExplorer;
//# sourceMappingURL=FileExplorer.js.map