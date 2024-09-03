import DriverException from "./DriverException";

export class ExecException extends DriverException {
    public constructor(message: string, cause?: unknown) {
        super(message, cause);
        this.name = 'ExecException';
    }
}

export default ExecException;
