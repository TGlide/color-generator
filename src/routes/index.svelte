<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Box from '$lib/UI/Box.svelte';
	import Flex from '$lib/UI/Flex.svelte';
	import Text from '$lib/UI/Text.svelte';
	import { getHSLA } from '$lib/utils/colors';

	let name = 'color';
	let color = '';
	let step = 10;

	$: parsedColor = getHSLA(color);
	$: [h, s] = parsedColor ?? ['0', '0'];

	const getCssVars = (h: string, s: string, colorName: string) => {
		const baseVar = `--base-${colorName}`;

		const vars = {
			[baseVar]: `${h} ${s}`
		};

		for (let l = step; l <= 100; l += step) {
			const varName = `--palette-${colorName}-${l}`;
			const varNameHsl = `${varName}-hsl`;

			vars[varNameHsl] = `var(${baseVar}) ${l}%`;
			vars[varName] = `hsla(var(${varNameHsl}) / 1)`;
		}

		return vars;
	};

	$: cssVars = getCssVars(h, s, name);
</script>

<svelte:head>
	<title>Color Generator</title>
</svelte:head>

<section class="themed">
	<Flex justify="center" align="center" p={16} mt={128}>
		<Box textAlign="left">
			<Text fontWeight={600} fontSize={32} mt={24}>Color Generator</Text>

			<Flex minW="50vh" direction="column" gap={16} mt={32}>
				<Box tag="label" display="block">
					<Text fontSize={18} mb={8}>Name</Text>
					<input bind:value={name} />
				</Box>
				<Box tag="label" display="block">
					<Text fontSize={18} mb={8}>Color</Text>
					<input bind:value={color} />
					{#if color && parsedColor === null}
						<Text color="red50" fontSize={12} mt={4}>Invalid color</Text>
					{/if}
				</Box>
				<Box tag="label" display="block">
					<Text fontSize={18} mb={8}>Step</Text>
					<input bind:value={step} type="number" />
				</Box>
			</Flex>

			<Flex direction="column" gap={6} mt={32}>
				{#each Object.entries(cssVars) as [key, value]}
					<Text fontFamily="mono">
						{key}:<Text tag="span" opacity={0.5}>&nbsp;{value};</Text>
					</Text>
				{/each}
			</Flex>
		</Box>
	</Flex>
</section>

<style>
	section.themed {
		--input-bg: var(--palette-gray-80);
	}

	:global([data-theme='dark']) section.themed {
		--input-bg: var(--palette-gray-20);
	}
	input {
		width: 100%;

		background-color: var(--input-bg);
		border-radius: 0.25rem;
		padding: 0.5rem 1rem;
		font-size: 1rem;
	}
</style>
