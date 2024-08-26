import type appEnvironment from '$app/environment';

export type DriverOptions = {
    readonly browser?: typeof appEnvironment.browser;
    readonly classWorkerURL?: string;
};

export interface Driver<T> {
    driver: T | null;

    init(options?: DriverOptions): T;

    load(options?: DriverOptions): Promise<boolean>;

    destroy(): void;
}
