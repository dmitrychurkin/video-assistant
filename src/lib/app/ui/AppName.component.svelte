<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	const {
		tag = 'span',
		component: Component,
		class: className
	}: {
		readonly component?: typeof SvelteComponent;
		readonly class?: string;
		readonly tag?: string;
	} = $props();

	const name = 'Video Assistant';
</script>

{#if Component}
	<Component class={className}>{name}</Component>
{:else}
	<svelte:element this={tag} class={className}>{name}</svelte:element>
{/if}
