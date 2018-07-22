import * as fs from 'fs';

export class FileExplorer {
    private HOME_DIR = '/home/pi/';

    getHomeDir(): string[] {
        return FileExplorer.getDir(this.HOME_DIR);
    }

    static getDir(currentPath: string): string[] {
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