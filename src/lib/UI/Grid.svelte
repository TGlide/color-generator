<script lang="ts" context="module">
	import Box, { parseSpace, type BoxProps } from './Box.svelte';

	type GridProps = BoxProps & {
		grid?: string;
		templateColumns?: string;
		templateRows?: string;
		gap?: string | number;
	};
</script>

<script lang="ts">
	interface $$Props extends GridProps {}

	const getStyle = (props: GridProps) => {
		return [
			// Style prop
			props.style ?? undefined,
			// Grid props
			props.grid ? `--grid: ${props.grid}` : undefined,
			props.templateColumns ? `--template-columns: ${props.templateColumns}` : undefined,
			props.templateRows ? `--template-rows: ${props.templateRows}` : undefined,
			parseSpace(props.gap, 'gap')
		]
			.filter(Boolean)
			.join(';');
	};

	$: style = getStyle($$props);
</script>

<div
	class="wrapper"
	class:grid={$$props.grid}
	class:templateColumns={$$props.templateColumns}
	class:templateRows={$$props.templateRows}
	class:gap={$$props.gap}
>
	<Box {style} {...$$props}>
		<slot />
	</Box>
</div>

<style>
	.wrapper {
		display: contents;
	}

	.wrapper > :global(*) {
		display: grid;
	}

	.wrapper.grid > :global(*) {
		grid: var(--grid);
	}

	.wrapper.templateColumns > :global(*) {
		grid-template-columns: var(--template-columns);
	}

	.wrapper.templateRows > :global(*) {
		grid-template-rows: var(--template-rows);
	}

	.wrapper.gap > :global(*) {
		grid-gap: var(--gap);
	}
</style>
