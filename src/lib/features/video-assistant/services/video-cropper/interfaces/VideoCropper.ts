import type { VideoRange } from "../types";

export interface VideoCropper {
    crop(videoRange: VideoRange): Promise<void>;
}
