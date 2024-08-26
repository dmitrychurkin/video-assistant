import { getContext } from "svelte";
import { Driver } from "./createDriver.svelte";

export default function useDriver() {
    return getContext(Driver.name);
};
