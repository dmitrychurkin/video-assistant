import DriverException from "./DriverException";

export class WriteFileException extends DriverException {
    public constructor(message: string, cause?: unknown) {
        super(message, cause);
        this.name = 'WriteFileException';
    }
}

export default WriteFileException;
