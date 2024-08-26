import { getContext } from "svelte";
import { Drawer } from "./createDrawer.svelte";

export default function useDrawer() {
    return getContext(Drawer.name);
};
