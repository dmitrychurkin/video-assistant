import { setContext } from 'svelte';
import type { Resource as IResource } from './interfaces';
import Resource from './Resource.svelte';

export default function createResource(): IResource {
    return setContext<IResource>(
        Resource.name,
        new Resource()
    );
}
