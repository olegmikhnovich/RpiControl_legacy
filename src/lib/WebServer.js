"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express = require("express");
const socketIo = require("socket.io");
const DeviceProperties_1 = require("./DeviceProperties");
const AudioControl_1 = require("./AudioControl");
const FileExplorer_1 = require("./FileExplorer");
class WebServer {
    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    createApp() {
        this.app = express();
    }
    createServer() {
        this.server = http_1.createServer(this.app);
    }
    config() {
        this.port = +process.env.PORT || WebServer.PORT;
    }
    sockets() {
        this.io = socketIo(this.server);
    }
    listen() {
        this.server.listen(this.port, '0.0.0.0', 0, () => {
            console.log('Socket server alive on %s.', this.port);
        });
        this.app.get('/get-file', (req, res) => {
            const p = req.query.path;
            if (p !== undefined) {
                res.sendFile(p);
            }
            else {
                res.sendStatus(404);
            }
        });
        this.io.on('connect', (socket) => {
            console.log('Angular client connected. (+)');
            socket.on('message', (m) => {
                const response = WebServer.processMessage(m);
                this.io.emit('message', response);
            });
            socket.on('disconnect', () => {
                console.log('Angular client disconnected (-)');
            });
        });
    }
    getApp() {
        return this.app;
    }
    static processMessage(message) {
        const authLabel = 'auth';
        const setDeviceNameLabel = 'set-device-name';
        const setSoundVolumeLabel = 'set-sound-volume';
        const getSoundVolumeLabel = 'get-sound-volume';
        const updatePortalPwdLabel = 'update-portal-pwd';
        const getDeviceInfoLabel = 'get-device-info';
        const getDirectoryLabel = 'get-dir';
        const m = JSON.parse(message);
        let result = '';
        switch (m['action']) {
            case authLabel:
                const dp = new DeviceProperties_1.DeviceProperties();
                result = (dp.getDeviceName() === m['login'] && dp.authUser(m['pwd']))
                    ? `[${authLabel}]OK`
                    : `[${authLabel}]Error`;
                break;
            case setDeviceNameLabel:
                const dp1 = new DeviceProperties_1.DeviceProperties();
                dp1.setDeviceName(m['name']);
                result = (dp1.getDeviceName() === m['name'])
                    ? `[${setDeviceNameLabel}]OK`
                    : `[${setDeviceNameLabel}]Error`;
                break;
            case setSoundVolumeLabel:
                const ac = new AudioControl_1.AudioControl();
                ac.setVolume(m['value']);
                const volume = ac.getVolume();
                result = (Math.abs(volume - m['value']) <= 1)
                    ? `[${setSoundVolumeLabel}]OK`
                    : `[${setSoundVolumeLabel}]Error`;
                break;
            case getSoundVolumeLabel:
                const ac1 = new AudioControl_1.AudioControl();
                result = `[${getSoundVolumeLabel}]OK\n${ac1.getVolume()}`;
                break;
            case updatePortalPwdLabel:
                const dp2 = new DeviceProperties_1.DeviceProperties();
                const res = dp2.setNewPwd(m['old'], m['new']);
                result = (res) ? `[${updatePortalPwdLabel}]OK` : `[${updatePortalPwdLabel}]Error`;
                break;
            case getDeviceInfoLabel:
                const dp3 = new DeviceProperties_1.DeviceProperties();
                const _name = `${dp3.getDeviceName()}\n`;
                const _model = `${dp3.getDeviceModel()}\n`;
                const _os = `${dp3.getOsVersion()}\n`;
                const _temp = `${dp3.getTemperature()}\n`;
                result = `[${getDeviceInfoLabel}]OK\n` + _name + _model + _os + _temp;
                break;
            case getDirectoryLabel:
                const fe = new FileExplorer_1.FileExplorer();
                result = `[${getDirectoryLabel}]OK\n`;
                if (m['path'] === 'home') {
                    result += fe.getHomeDir().toString();
                }
                else {
                    result += FileExplorer_1.FileExplorer.getDir(m['path']).toString();
                }
                break;
        }
        return result;
    }
}
WebServer.PORT = 4820;
exports.WebServer = WebServer;
//# sourceMappingURL=WebServer.js.map