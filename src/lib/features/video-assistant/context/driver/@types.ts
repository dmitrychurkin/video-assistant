import type appEnvironment from '$app/environment';
import type { Destroyable } from '$lib/app';

export type DriverOptions = {
    readonly browser?: typeof appEnvironment.browser;
    readonly classWorkerURL?: string;
};

export interface Driver<T> extends Destroyable {
    driver: T | null;

    init(options?: DriverOptions): T;

    load(options?: DriverOptions): Promise<boolean>;

    destroy(): void;
}
