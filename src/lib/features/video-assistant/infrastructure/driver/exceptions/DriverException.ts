export class DriverException extends Error {
    public constructor(message: string, cause?: unknown) {
        super(message, { cause });
        this.name = 'DriverException';
    }
}

export default DriverException;
