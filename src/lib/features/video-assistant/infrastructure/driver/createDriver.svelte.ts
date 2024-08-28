import {
    PUBLIC_VIDEO_ASSISTANT_DRIVER_EXTERNAL_LIB_BASE_URL
} from '$env/static/public';
import { setContext } from 'svelte';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
import type { Driver as IDriver, DriverOptions } from './@types';
import { DriverException } from './exceptions';

export class Driver implements IDriver<FFmpeg> {
    static #baseUrl = PUBLIC_VIDEO_ASSISTANT_DRIVER_EXTERNAL_LIB_BASE_URL;

    public static get baseUrl() {
        return Driver.#baseUrl;
    }

    public static set baseUrl(url: string) {
        Driver.#baseUrl = url;
    }

    public get driver() {
        return this.#driver;
    }

    public init(driverOptions?: DriverOptions): FFmpeg {
        const {
            browser = typeof window !== 'undefined'
        } = driverOptions ?? {};

        if (!browser) {
            throw new DriverException('Browser is required to initialize FFmpeg driver.');
        }

        const ffmpeg = this.#driver ?? new FFmpeg();

        ffmpeg.on('log', this.#logger);

        this.#driver = ffmpeg;

        return this.#driver;
    }

    public async load(driverOptions?: DriverOptions): Promise<boolean> {
        let driver: FFmpeg | null = this.#driver;

        if (!driver) {
            driver = this.init(driverOptions);
        }

        if (driver.loaded) {
            return true;
        }

        const {
            classWorkerURL = '/worker.js'
        } = driverOptions ?? {};

        const [
            coreURL,
            wasmURL,
            workerURL
        ] = await this.loadScripts();

        return driver.load({
            classWorkerURL,
            coreURL,
            wasmURL,
            workerURL
        });
    }

    public destroy() {
        this.#driver?.off('log', this.#logger);

        this.#driver = null;
    }

    private loadScripts() {
        const baseURL = Driver.baseUrl;

        return Promise.all([
            toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript')
        ]);
    }

    #driver = $state<FFmpeg | null>(null);

    #logger = (event: {
        readonly message: string;
    }) => {
        console.log(`[FFmpeg] ${event.message}`);
    };
}

export default function createDriver(): IDriver<FFmpeg> {
    return setContext<IDriver<FFmpeg>>(
        Driver.name,
        new Driver()
    );
};
