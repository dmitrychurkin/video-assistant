<script lang="ts">
	import Paper from '@smui/paper';
	import { Separator } from '@smui/list';
	import Button, { Label, Icon } from '@smui/button';
	import Textfield from '@smui/textfield';
	import TextfieldIcon from '@smui/textfield/icon';
	import HelperText from '@smui/textfield/helper-text';
	import { mdiCrop, mdiClockStart, mdiClockEnd, mdiArrowLeftRight } from '@mdi/js';
	import { Container, useCleanup } from '$lib/app';
	import {
		FileSelect,
		createResource,
		Player,
		useDriver,
		VideoCropperModel,
		VideoCropperService
	} from '$lib/features/video-assistant';
	import type { EventHandler } from 'svelte/elements';

	const driver = useDriver();
	const resource = createResource();

	const model = new VideoCropperModel();

	const service = new VideoCropperService(driver, resource);

	const onChange = (files: FileList | null) => {
		if (!files?.length) {
			return;
		}

		const [file] = files;

		resource.file = file;
	};

	const onCrop = () => service.crop(model);

	const onLoadedMetadata: EventHandler<Event, HTMLVideoElement> = ({ target }) => {
		if (target instanceof HTMLVideoElement) {
			model.init(target.duration);
		}
	};

	useCleanup(resource);
</script>

<svelte:head>
	<title>Video Cropper</title>
</svelte:head>

<Container class="container">
	<Paper variant="outlined" class="video-cropper-wrapper">
		<Player preload="metadata" onloadedmetadata={onLoadedMetadata} src={resource.objectUrl} />
		<Separator />
		<div class="actions">
			<FileSelect variant="raised" {onChange} />
			<Button variant="raised" onclick={onCrop}>
				<Icon tag="svg" viewBox="0 0 24 24">
					<path fill="currentColor" d={mdiCrop} />
				</Icon>
				<Label>Crop & Download Video</Label>
			</Button>
		</div>
	</Paper>
	<div class="inputs">
		<div>
			<Textfield class="shaped-filled" variant="filled" label="Start time" bind:value={model.start}>
				<TextfieldIcon slot="trailingIcon">
					<Icon class="input-icon" tag="svg" viewBox="0 0 24 24">
						<path fill="currentColor" d={mdiClockStart} />
					</Icon>
				</TextfieldIcon>
				<HelperText class="mdc-text-field-helper-line" persistent slot="helper">
					Select video start time
				</HelperText>
			</Textfield>
		</div>
		<Icon class="input-icon" tag="svg" viewBox="0 0 24 24">
			<path fill="currentColor" d={mdiArrowLeftRight} />
		</Icon>
		<div>
			<Textfield class="shaped-filled" variant="filled" label="End time" bind:value={model.end}>
				<TextfieldIcon slot="trailingIcon">
					<Icon class="input-icon" tag="svg" viewBox="0 0 24 24">
						<path fill="currentColor" d={mdiClockEnd} />
					</Icon>
				</TextfieldIcon>
				<HelperText class="mdc-text-field-helper-line" persistent slot="helper">
					Select video end time
				</HelperText>
			</Textfield>
		</div>
	</div>
</Container>

<style>
	:global(.video-cropper-wrapper) {
		display: grid;
		gap: 1rem;
		place-items: center;
		width: min(100vw, 650px);
	}

	:global(.shaped-filled) {
		border-radius: 16px 16px 0 0;
	}

	:global(.input-icon) {
		width: 24px;
		height: 24px;
	}

	:global(.mdc-text-field-helper-line) {
		color: rgba(0, 0, 0, 0.6);
	}

	:global(.container) {
		display: grid;
		place-items: center;
		gap: 1rem;
	}

	.actions,
	.inputs {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: center;
	}
</style>
