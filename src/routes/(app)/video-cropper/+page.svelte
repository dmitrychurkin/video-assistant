<script lang="ts">
	import Paper from '@smui/paper';
	import { Separator } from '@smui/list';
	import { Container, useCleanup } from '$lib/app';
	import { FileSelect, createResource, Player } from '$lib/features/video-assistant';

	const fileResource = createResource();

	const onChange = (files: FileList | null) => {
		if (!files?.length) {
			return;
		}

		const [file] = files;

		fileResource.resource = file;
		fileResource.objectUrl = fileResource.createObjectURL(file);
	};

	useCleanup(fileResource);
</script>

<svelte:head>
	<title>Video Cropper</title>
</svelte:head>

<Container>
	<Paper variant="outlined" class="video-cropper-wrapper">
		<Player src={fileResource.objectUrl} />
		<Separator />
		<FileSelect variant="raised" {onChange} />
	</Paper>
</Container>

<style>
	:global(.video-cropper-wrapper) {
		display: grid;
		gap: 1rem;
		place-items: center;
		width: min(100vw, 650px);
	}
</style>
