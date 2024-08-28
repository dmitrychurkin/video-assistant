<script lang="ts">
	import type { WithComponentProps } from '../interfaces';

	const {
		tag = 'span',
		component: Component,
		class: className
	}: WithComponentProps = $props();

	const name = 'Video Assistant';
</script>

{#if Component}
	<Component class={className}>{name}</Component>
{:else}
	<svelte:element this={tag} class={className}>{name}</svelte:element>
{/if}
