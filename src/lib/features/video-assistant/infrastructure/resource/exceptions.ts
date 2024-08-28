export class ResourceException extends Error {
    public constructor(message: string, cause?: unknown) {
        super(message, { cause });
        this.name = 'ResourceException';
    }
}
