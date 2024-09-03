import { getContext } from "svelte";
import type { FFmpeg } from '@ffmpeg/ffmpeg';
import type { Driver as IDriver } from "./interfaces";
import { Driver } from "./Driver.svelte";

export default function useDriver(): IDriver<FFmpeg> {
    return getContext(Driver.name);
};
