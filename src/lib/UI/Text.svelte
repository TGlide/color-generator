<script lang="ts" context="module">
	import Box, { parseSpace, type BoxProps } from './Box.svelte';

	type TextProps = BoxProps & {
		align?: 'left' | 'center' | 'right';
		fontSize?: string | number;
		fontWeight?: string | number;
		lineHeight?: string | number;
		letterSpacing?: string | number;
		textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
	};
</script>

<script lang="ts">
	interface $$Props extends TextProps {}

	const getStyle = (props: TextProps) => {
		return [
			// Style prop
			props.style ?? undefined,
			// Text props
			props.align ? `--align: ${props.align}` : undefined,
			props.textTransform ? `--textTransform: ${props.textTransform}` : undefined,
			parseSpace(props.fontSize, 'fontSize'),
			parseSpace(props.fontWeight, 'fontWeight'),
			parseSpace(props.lineHeight, 'lineHeight'),
			parseSpace(props.letterSpacing, 'letterSpacing')
		]
			.filter(Boolean)
			.join(';');
	};

	$: style = getStyle($$props);
</script>

<div
	class="wrapper"
	class:align={$$props.align}
	class:fontSize={$$props.fontSize}
	class:fontWeight={$$props.fontWeight}
	class:lineHeight={$$props.lineHeight}
	class:letterSpacing={$$props.letterSpacing}
	class:textTransform={$$props.textTransform}
>
	<Box {style} {...$$props}>
		<slot />
	</Box>
</div>

<style>
	.wrapper {
		display: contents;
	}

	.wrapper.align > :global(*) {
		align-self: var(--align);
	}

	.wrapper.fontSize > :global(*) {
		font-size: var(--fontSize);
	}

	.wrapper.fontWeight > :global(*) {
		font-weight: var(--fontWeight);
	}

	.wrapper.lineHeight > :global(*) {
		line-height: var(--lineHeight);
	}

	.wrapper.letterSpacing > :global(*) {
		letter-spacing: var(--letterSpacing);
	}

	.wrapper.textTransform > :global(*) {
		text-transform: var(--textTransform);
	}
</style>
