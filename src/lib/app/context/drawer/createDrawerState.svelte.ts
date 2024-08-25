import { setContext } from "svelte";
import type { DrawerState, DrawerStateOptions } from "./@types";

export class Drawer implements DrawerState {
    public isOpen = $state(false);

    public constructor(open: boolean) {
        this.isOpen = open;
    }

    public toggle() {
        this.isOpen = !this.open;
    }

    public open() {
        this.isOpen = true;
    }

    public close() {
        this.isOpen = false;
    }
}

export default function createDrawerState({
    open = false
}: DrawerStateOptions = {}): DrawerState {
    return setContext<DrawerState>(
        Drawer.name,
        new Drawer(open)
    );
};
