import type { FFmpeg } from '@ffmpeg/ffmpeg';

export type ProcessingSettings<T extends FFmpeg> = {
    readonly input: Parameters<T['writeFile']>;
    readonly exec: Parameters<T['exec']>;
    readonly output: Parameters<T['readFile']>;
};
