import { ChildProcess, exec } from "child_process";

export class Terminal {
    private readonly process;
    constructor(command: string) {
        this.process = exec(command);
    }

    public getProcess(): ChildProcess {
        return this.process;
    }
}