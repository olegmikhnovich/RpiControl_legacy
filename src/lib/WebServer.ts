import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import { DeviceProperties } from "./DeviceProperties";
import { AudioControl } from "./AudioControl";
import { FileExplorer } from "./FileExplorer";
import { Connectivity } from "./Connectivity";
import { Terminal } from "./Terminal";

export class WebServer {
    public static readonly PORT: number = 4820;
    private app: express.Application;
    private server: Server;
    private io: socketIo.Server;
    private port: number;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private config(): void {
        this.port = +process.env.PORT || WebServer.PORT;
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, '0.0.0.0', 0, () => {
            console.log('Socket server alive on %s.', this.port);
        });

        this.app.get('/get-file', (req, res) => {
            const p = req.query.path;
            if (p !== undefined) {
                res.sendFile(p);
            } else {
                res.sendStatus(404);
            }
        });

        this.io.on('connect', (socket: any) => {
            console.log('Angular client connected. (+)');
            socket.on('message', (m: string) => {
                const response = this.processMessage(m);
                this.io.emit('message', response);
            });

            socket.on('disconnect', () => {
                console.log('Angular client disconnected (-)');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }

    private processMessage(message: string): string {
        const authLabel = 'auth';
        const setDeviceNameLabel = 'set-device-name';
        const setSoundVolumeLabel = 'set-sound-volume';
        const getSoundVolumeLabel = 'get-sound-volume';
        const updatePortalPwdLabel = 'update-portal-pwd';
        const getDeviceInfoLabel = 'get-device-info';
        const getDirectoryLabel = 'get-dir';
        const getEthConnLabel = 'get-eth-conn';
        const sendTermCmdLabel = 'send-term-cmd';
        const termRespLabel = 'term-resp';

        const m = JSON.parse(message);
        let result = '';

        switch (m['action']) {
            case authLabel:
                const dp = new DeviceProperties();
                result = (dp.getDeviceName() === m['login'] && dp.authUser(m['pwd']))
                    ? `[${authLabel}]OK`
                    :`[${authLabel}]Error`;
                break;
            case setDeviceNameLabel:
                const dp1 = new DeviceProperties();
                dp1.setDeviceName(m['name']);
                result = (dp1.getDeviceName() === m['name'])
                    ? `[${setDeviceNameLabel}]OK`
                    : `[${setDeviceNameLabel}]Error`;
                break;
            case setSoundVolumeLabel:
                const ac = new AudioControl();
                ac.setVolume(m['value']);
                const volume = ac.getVolume();
                result = (Math.abs(volume - m['value']) <= 1)
                    ? `[${setSoundVolumeLabel}]OK`
                    : `[${setSoundVolumeLabel}]Error`;
                break;
            case getSoundVolumeLabel:
                const ac1 = new AudioControl();
                result = `[${getSoundVolumeLabel}]OK\n${ac1.getVolume()}`;
                break;
            case updatePortalPwdLabel:
                const dp2 = new DeviceProperties();
                const res = dp2.setNewPwd(m['old'], m['new']);
                result = (res) ? `[${updatePortalPwdLabel}]OK` : `[${updatePortalPwdLabel}]Error`;
                break;
            case getDeviceInfoLabel:
                const dp3 = new DeviceProperties();
                const _name = `${dp3.getDeviceName()}\n`;
                const _model = `${dp3.getDeviceModel()}\n`;
                const _os = `${dp3.getOsVersion()}\n`;
                const _temp = `${dp3.getTemperature()}\n`;
                result = `[${getDeviceInfoLabel}]OK\n` + _name + _model + _os + _temp;
                break;
            case getDirectoryLabel:
                const fe = new FileExplorer();
                result = `[${getDirectoryLabel}]OK\n`;
                if(m['path'] === 'home') {
                    result += fe.getHomeDir().toString();
                } else {
                    result += FileExplorer.getDir(m['path']).toString();
                }
                break;
            case getEthConnLabel:
                result = `[${getEthConnLabel}]OK\n` +
                JSON.stringify(Connectivity.getEthernetConnection());
                break;
            case sendTermCmdLabel:
                const process = new Terminal(m['command']).getProcess();
                process.stdout.on('data', (data) => {
                    const res = `[${termRespLabel}]OUT\n` + data;
                    this.io.emit('message', res);
                });
                process.stderr.on('data', (data) => {
                    const res = `[${termRespLabel}]ERR\n` + data;
                    this.io.emit('message', res);
                });
                process.on('close', (code) => {
                    const res = `[${termRespLabel}]CLOSE\n` + code;
                    this.io.emit('message', res);
                });
                break;
        }
        return result;
    }
}