import type { Destroyable } from '$lib/app';
import type { FFmpeg } from '@ffmpeg/ffmpeg';
import type { DriverOptions, ProcessingSettings } from '../types';

export interface Driver<T extends FFmpeg> extends Destroyable {
    driver: Promise<T>;

    init(options?: DriverOptions): T;

    load(options?: DriverOptions): Promise<boolean>;

    process(settings: ProcessingSettings<T>): ReturnType<T['readFile']>;

    writeFile(...args: Parameters<T['writeFile']>): ReturnType<T['writeFile']>;

    readFile(...args: Parameters<T['readFile']>): ReturnType<T['readFile']>;

    exec(...args: Parameters<T['exec']>): ReturnType<T['exec']>;

    destroy(): void;
}
