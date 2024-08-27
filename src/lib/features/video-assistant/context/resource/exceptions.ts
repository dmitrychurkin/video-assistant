export class ResourceException extends Error {
    constructor(message: string, cause?: unknown) {
        super(message, { cause });
        this.name = 'ResourceException';
    }
}
