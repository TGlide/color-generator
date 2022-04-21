<script lang="ts" context="module">
	import Box, { parseSpace, type BoxProps } from './Box.svelte';

	type FlexProps = BoxProps & {
		direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
		wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
		justify?: 'start' | 'end' | 'center' | 'between' | 'around';
		align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
		gap?: string | number;
	};
</script>

<script lang="ts">
	interface $$Props extends FlexProps {}

	const getStyle = (props: FlexProps) => {
		return [
			// Style prop
			props.style ?? undefined,
			// Flexbox props
			props.direction ? `--direction: ${props.direction}` : undefined,
			props.wrap ? `--wrap: ${props.wrap}` : undefined,
			props.justify ? `--justify: ${props.justify}` : undefined,
			props.align ? `--align: ${props.align}` : undefined,
			parseSpace(props.gap, 'gap')
		]
			.filter(Boolean)
			.join(';');
	};

	$: style = getStyle($$props);
</script>

<div
	class="flex-wrapper"
	class:direction={$$props.direction}
	class:wrap={$$props.wrap}
	class:justify={$$props.justify}
	class:align={$$props.align}
	class:gap={$$props.gap}
>
	<Box {style} {...$$props}>
		<slot />
	</Box>
</div>

<style>
	.flex-wrapper {
		display: contents;
	}

	.flex-wrapper > :global(div) {
		display: flex;
	}

	.flex-wrapper.direction > :global(div) {
		flex-direction: var(--direction);
	}

	.flex-wrapper.wrap > :global(div) {
		flex-wrap: var(--wrap);
	}

	.flex-wrapper.justify > :global(div) {
		justify-content: var(--justify);
	}

	.flex-wrapper.align > :global(div) {
		align-items: var(--align);
	}

	.flex-wrapper.gap > :global(div) {
		gap: var(--gap);
	}
</style>
