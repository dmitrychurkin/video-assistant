/** @type {import('vite').Connect.NextHandleFunction} */
export const sharedArrayBuffer = (_, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

    next();
};
