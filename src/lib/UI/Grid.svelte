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

<div class="grid-wrapper">
	<Box {style} {...$$props}>
		<slot />
	</Box>
</div>

<style>
	.grid-wrapper {
		display: contents;
	}

	.grid-wrapper > :global(div) {
		display: grid;
		grid: var(--grid);
		grid-template-columns: var(--template-columns);
		grid-template-rows: var(--template-rows);
		gap: var(--gap);
	}
</style>
