"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
class Terminal {
    constructor(command) {
        this.process = child_process_1.exec(command);
    }
    getProcess() {
        return this.process;
    }
}
exports.Terminal = Terminal;
//# sourceMappingURL=Terminal.js.map