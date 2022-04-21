<script lang="ts" context="module">
	import { isColor, theme, type Color, type Palette } from './theme';

	export type BoxProps = {
		m?: string | number;
		mt?: string | number;
		mr?: string | number;
		mb?: string | number;
		ml?: string | number;
		mx?: string | number;
		my?: string | number;

		p?: string | number;
		pt?: string | number;
		pr?: string | number;
		pb?: string | number;
		pl?: string | number;
		px?: string | number;
		py?: string | number;

		radius?: string | number;

		w?: string | number;
		h?: string | number;
		size?: string | number;

		bgColor?: Color | Palette;
		color?: Color | Palette;

		opacity?: number;

		style?: string;

		tag?: string;
	};

	export const pxToRem = (px: number) => {
		return `${px / 16}rem`;
	};

	export const parseSpace = (
		value: string | number | undefined,
		cssVar: string | string[]
	): string | undefined => {
		if (value === undefined) {
			return undefined;
		}

		let parsedValue = value;

		if (typeof value === 'number') {
			parsedValue = pxToRem(value);
		}

		if (typeof cssVar === 'string') {
			return `--${cssVar}: ${parsedValue};`;
		}

		return cssVar.map((v) => `--${v}: ${parsedValue}`).join(';');
	};

	export const parseColor = (value: Color | Palette): string => {
		return isColor(value) ? theme.colors[value] : theme.palette[value];
	};
</script>

<script lang="ts">
	interface $$Props extends BoxProps {}

	export let tag: $$Props['tag'] = 'div';

	const getStyle = (props: BoxProps) => {
		return [
			// Style prop
			props.style ?? undefined,
			// Margin
			parseSpace(props.m, 'm'),
			parseSpace(props.mt, 'mt'),
			parseSpace(props.mr, 'mr'),
			parseSpace(props.mb, 'mb'),
			parseSpace(props.ml, 'ml'),
			parseSpace(props.mx, ['ml', 'mr']),
			parseSpace(props.my, ['mt', 'mb']),

			// Padding
			parseSpace(props.p, 'p'),
			parseSpace(props.pt, 'pt'),
			parseSpace(props.pr, 'pr'),
			parseSpace(props.pb, 'pb'),
			parseSpace(props.pl, 'pl'),
			parseSpace(props.px, ['pl', 'pr']),
			parseSpace(props.py, ['mp', 'pb']),
			// Width and height
			parseSpace(props.w, 'w'),
			parseSpace(props.h, 'h'),
			parseSpace(props.size, ['w', 'h']),
			// Border
			parseSpace(props.radius, 'radius'),
			// Colors
			props.bgColor ? `--bgColor: ${parseColor(props.bgColor)}` : undefined,
			props.color ? `--color: ${parseColor(props.color)}` : undefined,
			// Opacity
			props.opacity ? `--opacity: ${props.opacity}` : undefined
		]
			.filter(Boolean)
			.join(';');
	};

	$: style = getStyle($$props);
</script>

<svelte:element
	this={tag}
	{style}
	class:m={$$props.m}
	class:mt={$$props.mt}
	class:mr={$$props.mr}
	class:mb={$$props.mb}
	class:ml={$$props.ml}
	class:mx={$$props.mx}
	class:my={$$props.my}
	class:p={$$props.p}
	class:pt={$$props.pt}
	class:pr={$$props.pr}
	class:pb={$$props.pb}
	class:pl={$$props.pl}
	class:px={$$props.px}
	class:py={$$props.py}
	class:radius={$$props.radius}
	class:w={$$props.w}
	class:h={$$props.h}
	class:size={$$props.size}
	class:bgColor={$$props.bgColor}
	class:color={$$props.color}
	class:opacity={$$props.opacity}
>
	<slot />
</svelte:element>

<style>
	.m {
		margin: var(--m, 0);
	}
	.mt,
	.my {
		margin-top: var(--mt, 0);
	}
	.mr,
	.mx {
		margin-right: var(--mr, 0);
	}

	.mb,
	.my {
		margin-bottom: var(--mb, 0);
	}

	.ml,
	.mx {
		margin-left: var(--ml, 0);
	}

	.p {
		padding: var(--p, 0);
	}

	.pt,
	.py {
		padding-top: var(--pt, 0);
	}

	.pr,
	.px {
		padding-right: var(--pr, 0);
	}

	.pb,
	.py {
		padding-bottom: var(--pb, 0);
	}

	.pl,
	.px {
		padding-left: var(--pl, 0);
	}

	.w,
	.size {
		width: var(--w);
	}

	.h,
	.size {
		height: var(--h);
	}

	.radius {
		border-radius: var(--radius);
	}

	.bgColor {
		background-color: var(--bgColor);
	}

	.color {
		color: var(--color);
	}

	.opacity {
		opacity: var(--opacity);
	}
</style>
