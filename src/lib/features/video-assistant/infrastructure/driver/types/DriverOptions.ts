import type appEnvironment from '$app/environment';

export type DriverOptions = {
    readonly browser?: typeof appEnvironment.browser;
    readonly classWorkerURL?: string;
}
