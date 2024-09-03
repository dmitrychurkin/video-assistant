import type { Resource as IResource } from './interfaces';

export class Resource implements IResource {
    public set file(value: File | null) {
        this.#revokeObjectURL(this.#objectUrl);

        this.#file = value;
        this.#objectUrl = this.#createObjectURL(value);
    }

    public get objectUrl() {
        return this.#objectUrl;
    }

    public get type() {
        return this.#file!.type;
    }

    public get name() {
        return this.#file!.name;
    }

    public get extension() {
        return this.#file!
            .name
            .split('.')
            .pop()!;
    }

    public toResourceData() {
        return this.#file!
            .arrayBuffer()
            .then(data => new Uint8Array(data));
    }

    public download(file?: File): void {
        const dowloadable = file ?? this.#file;

        if (!dowloadable) {
            return;
        }

        const url = this.#createObjectURL(dowloadable);

        const a = document.createElement('a');
        a.href = `${url}`;
        a.download = dowloadable.name;
        a.click();

        this.#revokeObjectURL(url);
    }

    public destroy(): void {
        this.#revokeObjectURL(this.#objectUrl);
        this.#setDefaults();
    }

    #createObjectURL(blob: Blob | null): string | undefined {
        if (blob) {
            return URL.createObjectURL(blob);
        }
    }

    #revokeObjectURL(url?: string): void {
        if (url) {
            URL.revokeObjectURL(url);
        }
    }

    #setDefaults() {
        this.#file = null;
        this.#objectUrl = undefined;;
    }

    #file = $state<File | null>(null);

    #objectUrl = $state<string>();
}

export default Resource;
