import { getContext } from "svelte";
import type { Resource as IResource } from "./interfaces";
import Resource from "./Resource.svelte";

export default function useResource(): IResource {
    return getContext(Resource.name);
}
