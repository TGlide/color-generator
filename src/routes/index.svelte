<script context="module" lang="ts">
	import Box from '$lib/UI/Box.svelte';
	import Flex from '$lib/UI/Flex.svelte';
	import Grid from '$lib/UI/Grid.svelte';
	import { theme } from '$lib/UI/theme';
	import { objectKeys } from '$lib/utils/object';

	export const prerender = true;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section id="colors">
	<h3>Palette</h3>

	<Grid gap={32} templateColumns="repeat(10, 1fr)" mt={16}>
		{#each objectKeys(theme.palette) as key}
			<Flex mt={8} direction="column" gap={6}>
				<Box bgColor={key} size={64} radius={6} />
				<h4>{key}</h4>
			</Flex>
		{/each}
	</Grid>
</section>

<style>
	section {
		padding: 1rem;
	}
</style>
