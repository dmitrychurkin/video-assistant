<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ChangeEventHandler, HTMLInputAttributes } from 'svelte/elements';
	import Button, { Label, Icon } from '@smui/button';
	import { mdiFile } from '@mdi/js';

	const {
		onChange,
		variant = 'text',
		accept = 'video/*',
		multiple = false,
		icon = mdiFile,
		children,
		...restAttributes
	}: HTMLInputAttributes & {
		readonly onChange: (
			files: FileList | null,
			event?: Parameters<ChangeEventHandler<typeof fileInput>>[0]
		) => void;
		readonly variant?: Button['variant'];
		readonly icon?: string;
		readonly children?: Snippet;
	} = $props();

	let fileInput: HTMLInputElement;

	const handleUpload = () => fileInput.click();

	const handleFileChange: ChangeEventHandler<typeof fileInput> = (event) => {
		const { target } = event;

		const files = target instanceof HTMLInputElement ? target.files : null;

		onChange(files, event);
	};
</script>

<Button {variant} onclick={handleUpload}>
	<Icon tag="svg" viewBox="0 0 24 24">
		<path fill="currentColor" d={icon} />
	</Icon>
	<Label>
		{#if children}
			{@render children()}
		{:else}
			Upload file
		{/if}
	</Label>
</Button>

<input
	{...restAttributes}
	{multiple}
	{accept}
	type="file"
	bind:this={fileInput}
	onchange={handleFileChange}
/>

<style>
	input[type='file'] {
		display: none;
	}
</style>
