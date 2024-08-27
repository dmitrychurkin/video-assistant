<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import TopAppBar, { Row, Section, Title as AppBarTitle, AutoAdjust } from '@smui/top-app-bar';
	import Drawer, { AppContent, Content, Header, Title, Subtitle, Scrim } from '@smui/drawer';
	import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
	import IconButton, { Icon } from '@smui/icon-button';
	import { mdiCrop, mdiMenu } from '@mdi/js';
	import { config, util, drawer, AppName } from '$lib/app';
	import { videoAssistant } from '$lib/features';

	const { children } = $props();

	const appDrawer = drawer.createDrawer();
	const driver = videoAssistant.createDriver();

	setTimeout(() => {
		driver
			.load({ browser })
			.then((result) => console.info('Driver loaded:', result))
			.catch((error) => {
				if (!(error instanceof videoAssistant.DriverException)) {
					throw error;
				}
			});
	});

	const openDrawer = () => appDrawer.open();

	const closeDrawer = () => appDrawer.close();

	let topAppBar = $state<TopAppBar>();

	$effect(() => () => driver.destroy());
</script>

<TopAppBar variant="fixed" bind:this={topAppBar}>
	<Row class="mdc-top-app-bar__row">
		<Section>
			<IconButton onclick={openDrawer}>
				<Icon tag="svg" viewBox="0 0 24 24">
					<path fill="currentColor" d={mdiMenu} />
				</Icon>
			</IconButton>
			<AppName class="mdc-top-app-bar__title" component={AppBarTitle} />
		</Section>
	</Row>
</TopAppBar>

<Drawer variant="modal" bind:open={appDrawer.isOpen}>
	<Header class="mdc-drawer__header">
		<AppName class="mdc-drawer__title" component={Title} />
		<Subtitle class="mdc-drawer__subtitle">Make your videos easy!</Subtitle>
	</Header>
	<Content class="mdc-drawer__content">
		<List>
			<Item
				href={util.router.url(config.WebRoute.VideoCropper)}
				activated={util.router.isActiveRoute($page.url, config.WebRoute.VideoCropper)}
			>
				<Graphic class="material-icons" aria-hidden="true">
					<Icon tag="svg" viewBox="0 0 24 24">
						<path fill="currentColor" d={mdiCrop} />
					</Icon>
				</Graphic>
				<Text>Video cropper</Text>
			</Item>
			<Separator />
			<Subheader tag="h6" class="mdc-deprecated-list-group__subheader">Misc</Subheader>
		</List>
	</Content>
</Drawer>

<Scrim onclick={closeDrawer} />

<AppContent class="mdc-drawer-app-content app-content">
	<AutoAdjust {topAppBar}>
		{@render children()}
	</AutoAdjust>
</AppContent>

<style>
	:global(:root) {
		--primary-font: 'Roboto', sans-serif;
	}

	:global(body) {
		margin: 0;
		height: 100%;
		font-family: var(--primary-font);
		position: relative;
	}

	:global(.app-content) {
		padding: 16px;
	}
</style>
