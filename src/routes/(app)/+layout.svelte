<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import TopAppBar, { Row, Section, Title as AppBarTitle, AutoAdjust } from '@smui/top-app-bar';
	import Drawer, { AppContent, Content, Header, Title, Subtitle, Scrim } from '@smui/drawer';
	import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
	import IconButton, { Icon } from '@smui/icon-button';
	import { mdiCrop, mdiMenu } from '@mdi/js';
	import { config, util, drawer, AppName, useCleanup, Container } from '$lib/app';
	import { videoAssistant } from '$lib/features';

	const { children } = $props();

	const appDrawer = drawer.createDrawer();
	const driver = videoAssistant.createDriver();

	const process = driver.load({ browser }).catch((error) => {
		if (!(error instanceof videoAssistant.DriverException)) {
			throw error;
		}
	});

	const openDrawer = () => appDrawer.open();

	const closeDrawer = () => appDrawer.close();

	let topAppBar = $state<TopAppBar>();

	useCleanup(driver);
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
		<Container suspence={process}>
			{@render children()}
		</Container>
	</AutoAdjust>
</AppContent>

<style>
	:global(:root) {
		--primary-font: 'Roboto', sans-serif;

		/* Theme colors. */
		--mdc-theme-primary: #1a73e8;
		--mdc-theme-secondary: #676778;
		--mdc-theme-background: #fff;
		--mdc-theme-surface: #fff;
		--mdc-theme-error: #b71c1c;
		--mdc-theme-on-primary: #fff;
		--mdc-theme-on-secondary: #fff;
		--mdc-theme-on-surface: #000;
		--mdc-theme-on-error: #fff;
		--mdc-theme-text-primary-on-background: rgba(0, 0, 0, 0.87);
		--mdc-theme-text-secondary-on-background: rgba(0, 0, 0, 0.54);
		--mdc-theme-text-hint-on-background: rgba(0, 0, 0, 0.38);
		--mdc-theme-text-disabled-on-background: rgba(0, 0, 0, 0.38);
		--mdc-theme-text-icon-on-background: rgba(0, 0, 0, 0.38);
		--mdc-theme-text-primary-on-light: rgba(0, 0, 0, 0.87);
		--mdc-theme-text-secondary-on-light: rgba(0, 0, 0, 0.54);
		--mdc-theme-text-hint-on-light: rgba(0, 0, 0, 0.38);
		--mdc-theme-text-disabled-on-light: rgba(0, 0, 0, 0.38);
		--mdc-theme-text-icon-on-light: rgba(0, 0, 0, 0.38);
		--mdc-theme-text-primary-on-dark: white;
		--mdc-theme-text-secondary-on-dark: rgba(255, 255, 255, 0.7);
		--mdc-theme-text-hint-on-dark: rgba(255, 255, 255, 0.5);
		--mdc-theme-text-disabled-on-dark: rgba(255, 255, 255, 0.5);
		--mdc-theme-text-icon-on-dark: rgba(255, 255, 255, 0.5);

		/* Layout grid spacing. */
		--mdc-layout-grid-margin-desktop: 24px;
		--mdc-layout-grid-gutter-desktop: 24px;
		--mdc-layout-grid-column-width-desktop: 72px;
		--mdc-layout-grid-margin-tablet: 16px;
		--mdc-layout-grid-gutter-tablet: 16px;
		--mdc-layout-grid-column-width-tablet: 72px;
		--mdc-layout-grid-margin-phone: 16px;
		--mdc-layout-grid-gutter-phone: 16px;
		--mdc-layout-grid-column-width-phone: 72px;
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
