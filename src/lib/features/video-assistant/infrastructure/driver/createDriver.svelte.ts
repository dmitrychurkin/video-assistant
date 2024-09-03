import { setContext } from 'svelte';
import type { FFmpeg } from '@ffmpeg/ffmpeg';
import type { Driver as IDriver } from './interfaces';
import Driver from './Driver.svelte';

export default function createDriver(): IDriver<FFmpeg> {
    return setContext<IDriver<FFmpeg>>(
        Driver.name,
        new Driver()
    );
};
