export class DriverException extends Error {
    constructor(message: string, cause?: unknown) {
        super(message, { cause });
        this.name = 'DriverException';
    }
}
