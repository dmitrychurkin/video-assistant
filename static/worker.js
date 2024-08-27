const ERROR_UNKNOWN_MESSAGE_TYPE = new Error('unknown message type');
const ERROR_NOT_LOADED = new Error('ffmpeg is not loaded, call `await ffmpeg.load()` first');
const ERROR_TERMINATED = new Error('called FFmpeg.terminate()');
const ERROR_IMPORT_FAILURE = new Error('failed to import ffmpeg-core.js');

const FFMessageType = {
    LOAD: 'LOAD',
    EXEC: 'EXEC',
    WRITE_FILE: 'WRITE_FILE',
    READ_FILE: 'READ_FILE',
    DELETE_FILE: 'DELETE_FILE',
    RENAME: 'RENAME',
    CREATE_DIR: 'CREATE_DIR',
    LIST_DIR: 'LIST_DIR',
    DELETE_DIR: 'DELETE_DIR',
    ERROR: 'ERROR',
    DOWNLOAD: 'DOWNLOAD',
    PROGRESS: 'PROGRESS',
    LOG: 'LOG',
    MOUNT: 'MOUNT',
    UNMOUNT: 'UNMOUNT'
};

let ffmpeg;
const load = async ({ coreURL, wasmURL, workerURL }) => {
    const first = !ffmpeg;

    self.createFFmpegCore = (await import(coreURL)).default;
    if (!self.createFFmpegCore) {
        throw ERROR_IMPORT_FAILURE;
    }

    ffmpeg = await self.createFFmpegCore({
        // Fix `Overload resolution failed.` when using multi-threaded ffmpeg-core.
        // Encoded wasmURL and workerURL in the URL as a hack to fix locateFile issue.
        mainScriptUrlOrBlob: `${coreURL}#${btoa(JSON.stringify({ wasmURL, workerURL }))}`,
    });

    ffmpeg.setLogger((data) => self.postMessage({ type: FFMessageType.LOG, data }));

    ffmpeg.setProgress((data) => self.postMessage({
        type: FFMessageType.PROGRESS,
        data,
    }));

    return first;
};

const exec = ({ args, timeout = -1 }) => {
    ffmpeg.setTimeout(timeout);

    ffmpeg.exec(...args);

    const ret = ffmpeg.ret;

    ffmpeg.reset();

    return ret;
};

const writeFile = ({ path, data }) => {
    ffmpeg.FS.writeFile(path, data);
    return true;
};

const readFile = ({ path, encoding }) => ffmpeg.FS.readFile(path, { encoding });

const deleteFile = ({ path }) => {
    ffmpeg.FS.unlink(path);

    return true;
};

const rename = ({ oldPath, newPath }) => {
    ffmpeg.FS.rename(oldPath, newPath);

    return true;
};

const createDir = ({ path }) => {
    ffmpeg.FS.mkdir(path);

    return true;
};

const listDir = ({ path }) => {
    const names = ffmpeg.FS.readdir(path);

    const nodes = [];

    for (const name of names) {
        const stat = ffmpeg.FS.stat(`${path}/${name}`);

        const isDir = ffmpeg.FS.isDir(stat.mode);

        nodes.push({ name, isDir });
    }

    return nodes;
};

const deleteDir = ({ path }) => {
    ffmpeg.FS.rmdir(path);

    return true;
};

const mount = ({ fsType, options, mountPoint }) => {
    const str = fsType;

    const fs = ffmpeg.FS.filesystems[str];

    if (!fs)
        return false;

    ffmpeg.FS.mount(fs, options, mountPoint);

    return true;
};

const unmount = ({ mountPoint }) => {
    ffmpeg.FS.unmount(mountPoint);

    return true;
};

self.onmessage = async ({ data: { id, type, data: _data }, }) => {
    const trans = [];

    let data;
    try {
        if (type !== FFMessageType.LOAD && !ffmpeg)
            throw ERROR_NOT_LOADED; // eslint-disable-line
        switch (type) {
            case FFMessageType.LOAD:
                data = await load(_data);
                break;
            case FFMessageType.EXEC:
                data = exec(_data);
                break;
            case FFMessageType.WRITE_FILE:
                data = writeFile(_data);
                break;
            case FFMessageType.READ_FILE:
                data = readFile(_data);
                break;
            case FFMessageType.DELETE_FILE:
                data = deleteFile(_data);
                break;
            case FFMessageType.RENAME:
                data = rename(_data);
                break;
            case FFMessageType.CREATE_DIR:
                data = createDir(_data);
                break;
            case FFMessageType.LIST_DIR:
                data = listDir(_data);
                break;
            case FFMessageType.DELETE_DIR:
                data = deleteDir(_data);
                break;
            case FFMessageType.MOUNT:
                data = mount(_data);
                break;
            case FFMessageType.UNMOUNT:
                data = unmount(_data);
                break;
            default:
                throw ERROR_UNKNOWN_MESSAGE_TYPE;
        }
    }
    catch (e) {
        self.postMessage({
            id,
            type: FFMessageType.ERROR,
            data: e.toString(),
        });
        return;
    }

    if (data instanceof Uint8Array) {
        trans.push(data.buffer);
    }

    self.postMessage({ id, type, data }, trans);
};
