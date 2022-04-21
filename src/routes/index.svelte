<script context="module" lang="ts">
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
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
	<Flex gap={16} align="center">
		<h3>Palette</h3>
		<ThemeSwitch />
	</Flex>

	<Grid gap={32} templateColumns="repeat(10, 1fr)" mt={16}>
		{#each objectKeys(theme.palette) as key}
			<Flex mt={8} direction="column" gap={6}>
				<Box bgColor={key} size={64} radius={6} />
				<span>{key}</span>
			</Flex>
		{/each}
	</Grid>
</section>

<style>
	section {
		padding: 1rem;
	}

	#colors h3 {
		font-size: 2rem;
	}
</style>
