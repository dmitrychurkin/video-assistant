<script lang="ts">
	import type { HTMLVideoAttributes } from 'svelte/elements';
	import type { WithComponentProps } from '$lib/app';
	import { classMap } from '@smui/common/internal';

	const {
		class: className = '',
		controls = true,
        children,
		...restProps
	}: WithComponentProps<HTMLVideoAttributes> = $props();
</script>

<video
	{...restProps}
	{controls}
	class={classMap({
		[className]: true,
		'player': true
	})}
>
    {#if children}
        {@render children()}
    {/if}
	<track kind="captions" srcLang="en" label="English" />
</video>

<style>
	.player {
		max-height: calc(100vh - 300px);
		width: max(100%, 650px);
	}
</style>
