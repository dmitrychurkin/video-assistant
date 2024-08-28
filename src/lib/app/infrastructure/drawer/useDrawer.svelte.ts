import { getContext } from "svelte";
import type { Drawer as IDrawer } from "./@types";
import { Drawer } from "./createDrawer.svelte";

export default function useDrawer(): IDrawer {
    return getContext(Drawer.name);
};
