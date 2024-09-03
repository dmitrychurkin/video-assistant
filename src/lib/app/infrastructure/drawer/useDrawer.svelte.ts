import { getContext } from "svelte";
import type { Drawer as IDrawer } from "./@types";
import { Drawer } from "./Drawer.svelte";

export default function useDrawer(): IDrawer {
    return getContext(Drawer.name);
};
