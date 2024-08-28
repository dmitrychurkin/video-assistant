import { setContext } from 'svelte';
import type { Resource as IResource } from './@types';

export class Resource<TResource extends  Blob> implements IResource<TResource> {
    public get resource() {
        return this.#resource;
    }

    public set resource(value: TResource | null) {
        this.#resource = value;
    }

    public get objectUrl() {
        return this.#objectUrl;
    }

    public set objectUrl(value: string) {
        this.#objectUrl = value;
    }

    public createObjectURL(media: TResource): string {
        return URL.createObjectURL(media);
    }

    public revokeObjectURL(url: string): void {
        URL.revokeObjectURL(url);
    }

    public destroy(): void {
        this.revokeObjectURL(this.#objectUrl);

        this.#resource = null;
        this.#objectUrl = '';
    }

    #resource = $state<TResource | null>(null);

    #objectUrl = $state<string>('');
}

export default function createResource<TResource extends  Blob>(): IResource<TResource> {
    return setContext<IResource<TResource>>(
        Resource.name,
        new Resource<TResource>()
    );
}
