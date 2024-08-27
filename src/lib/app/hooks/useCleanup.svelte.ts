import type { Destroyable } from "../interfaces";

export default function useCleanup(destroyable: Destroyable) {
    $effect(() => () => destroyable.destroy());
};
