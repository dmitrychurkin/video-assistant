import type { Page } from '@sveltejs/kit';

export const hasPrependSlash = (pathname: string) => pathname.startsWith('/');

export const url = <T extends string>(pathname: T) => (
    hasPrependSlash(pathname)
        ? pathname
        : `/${pathname}`
);

export const isActiveRoute = ({ pathname }: Page<Record<string, string>, string | null>['url'], route: string) =>
    Object.is(pathname, url(route));

