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

	$: parsedColor = getHSLA(color);
	$: [h, s, l, a] = parsedColor ?? [];

	const getCssVars = (h: string, s: string, colorName: string) => {
		const baseVar = `--base-${colorName}`;

		const vars = {
			[baseVar]: `${h}, ${s}`
		};

		for (let l = 10; l <= 100; l += 10) {
			const varName = `--palette-${colorName}-${l}`;
			const varNameHsl = `${varName}-hsl`;

			vars[varNameHsl] = `var(${baseVar}), ${l}%`;
			vars[varName] = `hsla(var(${varNameHsl}), 100%)`;
		}

		return vars;
	};

	$: cssVars = getCssVars(h, s, name);
</script>

<svelte:head>
	<title>Color Generator</title>
</svelte:head>

<section class="themed">
	<Flex justify="center" align="center" minH="100vh" p={16}>
		<Box>
			<a href="/">{'<'} Back</a>
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
			</Flex>

			<Flex direction="column" gap={6} mt={32}>
				{#each Object.entries(cssVars) as [key, value]}
					<Text fontFamily="mono">
						{key}:<span class="alpha">&nbsp;{value};</span>
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
	a {
		transition: opacity 0.25s ease;
	}

	a:hover {
		opacity: 0.75;
	}

	input {
		width: 100%;

		background-color: var(--input-bg);
		border-radius: 0.25rem;
		padding: 0.5rem 1rem;
		font-size: 1rem;
	}

	.alpha {
		opacity: 0.5;
	}
</style>
