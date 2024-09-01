<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { WithComponentWithChildrenProps } from '../interfaces';
	import { classMap } from '@smui/common/internal';
	import CircularProgress from '@smui/circular-progress';

	const {
		children,
		resource,
		loader,
		error,
		class: className = '',
		...restProps
	}: WithComponentWithChildrenProps & {
		readonly resource?: Promise<unknown>;
		readonly loader?: Snippet;
		readonly error?: Snippet<[Error]>;
	} = $props();
</script>

<div
	{...restProps}
	class={classMap({
		[className]: true,
		container: true
	})}
>
	{#if resource}
		{#await resource}
			{#if loader}
				{loader}
			{:else}
				<CircularProgress
					class="four-color-circular-progress"
					style="height: 100px; width: 100px;"
					indeterminate
					fourColor
				/>
			{/if}
		{:then}
			{@render children()}
		{:catch e}
			{#if error}
				{@render error(e)}
			{:else}
				<p class="container--error">{e.message}</p>
			{/if}
		{/await}
	{:else}
		{@render children()}
	{/if}
</div>

<style>
	.container {
		display: grid;
		place-content: center;
		height: 100%;
	}

	.container--error {
		color: var(--mdc-theme-error);
		font-size: 2rem;
		text-align: center;
	}
</style>
