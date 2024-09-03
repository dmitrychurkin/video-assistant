import { VideoRangeModel } from './domain';
import type { Value } from './types';

export class Model extends VideoRangeModel {
    public init(duration: number): void {
        this.#duration = duration;
        this.#end = duration;
        this.#start = 0;
    }

    public set duration(value: number) {
        this.#duration = value;
    }

    public get start() {
        return this.#start;
    }

    public set start(value: Value) {
        this.#start = this.#parseStart(value);
    }

    public get end() {
        return this.#end;
    }

    public set end(value: Value) {
        this.#end = this.#parseEnd(value);
    }

    #parseStart(value: Value): Value {
        let start = this.parse(value);

        if (!start) {
            return start;
        }

        start = Number(start);
        const end = Number(this.#end);

        if (start < 0) {
            return 0;
        }

        if (start > end) {
            return this.#end;
        }

        return start;
    }

    #parseEnd(value: Value): Value {
        let end = this.parse(value);

        if (!end) {
            return this.#parseEnd(this.#duration);
        }

        end = Number(end);
        const start = Number(this.#start);

        if (end < start) {
            return start;
        }

        if (end > this.#duration) {
            return this.#parseEnd(this.#duration);
        }

        return end;
    }

    #duration = 0;

    #start = $state<Value>('');

    #end = $state<Value>('');
}

export default Model;
