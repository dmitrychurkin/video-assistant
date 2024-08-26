export interface Drawer {
    isOpen: boolean;

    toggle(): void;

    open(): void;

    close(): void;
};

export type DrawerOptions = {
    open?: boolean;
};
