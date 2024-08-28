import { getContext } from "svelte";
import type { Resource as IResource } from "./@types";
import { Resource } from "./createResource.svelte";

export default function useResource<TResource extends Blob>(): IResource<TResource> {
    return getContext(Resource.name);
};
