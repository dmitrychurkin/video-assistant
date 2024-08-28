import type { Snippet, SvelteComponent } from "svelte";

export interface Destroyable {
    destroy(): void;
}

export type WithComponentProps<T extends object = {}> = {
    readonly class?: string;
    readonly style?: string;
    readonly tag?: string;
    readonly component?: typeof SvelteComponent<
      Record<string, any>,
      Record<string, any>,
      Record<string, any>
    >;
} & T;

export type WithComponentWithChildrenProps<T extends object = {}> = WithComponentProps<
    T & {
        readonly children: Snippet;
    }
>;
