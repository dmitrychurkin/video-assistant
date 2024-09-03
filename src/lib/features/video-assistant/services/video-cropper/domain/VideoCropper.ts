import type { FFmpeg } from "@ffmpeg/ffmpeg";
import type { Driver, Resource } from "$lib/features/video-assistant/infrastructure";
import type { VideoCropper as IVideoCropper } from "../interfaces";
import type { Value, VideoRange } from "../types";
import { converter } from "$lib/features/video-assistant/util";

export abstract class VideoCropper implements IVideoCropper {
    public constructor(
        protected readonly driver: Driver<FFmpeg>,
        protected readonly resource: Resource
    ) {
    }

    public abstract crop(videoRange: VideoRange): Promise<void>;

    protected get output(): string {
        return [
            `${this.resource.name}-cropped`,
            this.resource.extension
        ].join('.');
    }

    protected parseVideoRangeValue(value: Value): string {
        return converter.msToHMS(
            converter.secToMillisec(Number(value))
        );
    }
}
