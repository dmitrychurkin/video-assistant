export interface DrawerState {
    isOpen: boolean;

    toggle(): void;

    open(): void;

    close(): void;
};

export type DrawerStateOptions = {
    open?: boolean;
};
