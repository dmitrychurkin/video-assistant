import { setContext } from "svelte";
import type { Drawer as IDrawer, DrawerOptions } from "./@types";

export class Drawer implements IDrawer {
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

export default function createDrawer({
    open = false
}: DrawerOptions = {}): IDrawer {
    return setContext<IDrawer>(
        Drawer.name,
        new Drawer(open)
    );
};
