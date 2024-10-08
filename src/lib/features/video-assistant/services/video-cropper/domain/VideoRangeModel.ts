import type { Value, VideoRange } from "../types";

export abstract class VideoRangeModel implements VideoRange {
    public constructor(precition: number = 3) {
        this.#precition = precition;
    };

    public abstract readonly start: Value;

    public abstract readonly end: Value;

    public abstract init(duration: number): void;

    protected duration = 0;

    protected parse(value: Value): Value {
        const num = Number.parseFloat(`${value}`);

        if (Number.isNaN(num)) {
            return '';
        }

        return num.toPrecision(this.#precition);
    }

    #precition: number;
}

export default VideoRangeModel;
