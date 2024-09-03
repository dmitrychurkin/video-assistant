/**
 * Source https://coderwall.com/p/wkdefg/converting-milliseconds-to-hh-mm-ss-mmm
 */
export function msToHMS(duration: number) {
    const milliseconds = Number.parseInt(`${(duration % 1000) / 100}`);
    const seconds = Number.parseInt(`${(duration / 1000) % 60}`);
    const minutes = Number.parseInt(`${(duration / (1000 * 60)) % 60}`);
    const hours = Number.parseInt(`${(duration / (1000 * 60 * 60)) % 24}`);

    return [
        pad(hours, [2]),
        pad(minutes, [2]),
        [pad(seconds, [2]), milliseconds]
            .filter(Boolean)
            .join('.')
    ].join(':');
};

export function secToMillisec(sec: number) {
    return Math.max(Math.abs(sec), 0) * 1000;
};

export function pad(str: string | number, [num, pref = '00']: [number, string?]) {
    return `${pref}${str}`.slice(-num);
};
