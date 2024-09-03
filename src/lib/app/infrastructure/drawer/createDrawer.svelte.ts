import { setContext } from "svelte";
import type { Drawer as IDrawer, DrawerOptions } from "./@types";
import Drawer from "./Drawer.svelte";

export default function createDrawer({
    open = false
}: DrawerOptions = {}): IDrawer {
    return setContext<IDrawer>(
        Drawer.name,
        new Drawer(open)
    );
};
