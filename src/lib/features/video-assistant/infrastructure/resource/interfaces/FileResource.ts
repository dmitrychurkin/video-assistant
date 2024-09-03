import type { Destroyable } from "$lib/app";

export interface FileResource extends Pick<
    File,
    | 'name'
    | 'type'
> {
    readonly extension: string;

    download(file?: File): void;

    toResourceData(): Promise<Uint8Array>;
}
