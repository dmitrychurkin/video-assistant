<script lang="ts">
	import type { WithComponentWithChildrenProps } from "../interfaces";
    import { classMap } from '@smui/common/internal';

    const {
        children,
        class: className = '',
        ...restProps
        }: WithComponentWithChildrenProps = $props();
</script>

<div
    {...restProps}
    class={classMap({
        [className]: true,
        container: true,
    })}
>
    {@render children()}
</div>

<style>
    .container {
        display: grid;
        place-content: center;
        height: 100%;
    }
</style>
