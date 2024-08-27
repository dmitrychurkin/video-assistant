<script lang="ts">
	import Paper from '@smui/paper';
	import { Container, useCleanup } from '$lib/app';
	import { FileUpload, createResource } from '$lib/features/video-assistant';
	import { Separator } from '@smui/list';

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
		<video class="preview-player" controls src={fileResource.objectUrl}>
			<track kind="captions" src="captions_en.vtt" srcLang="en" label="English" />
		</video>
		<Separator />
		<FileUpload variant="raised" {onChange} />
	</Paper>
</Container>

<style>
	:global(.video-cropper-wrapper) {
		display: grid;
		gap: 1rem;
		place-items: center;
		width: min(100vw, 650px);
	}
	.preview-player {
		width: max(100%, 650px);
	}
</style>
