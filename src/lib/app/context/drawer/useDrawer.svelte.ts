import { getContext } from "svelte";
import { Drawer } from "./createDrawerState.svelte";

export default function useDrawer() {
    return getContext(Drawer.name);
};
