import type { Destroyable } from "$lib/app";
import type { FileResource } from "./FileResource";

export interface Resource extends FileResource, Destroyable {
    file: File | null;

    objectUrl?: string;
}
