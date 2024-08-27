import type { Destroyable } from "$lib/app";

export interface Resource<T extends Blob | MediaSource> extends Destroyable {
    resource: T | null;

    objectUrl?: string;

    createObjectURL(media: T): string;

    revokeObjectURL(url: string): void;
}
