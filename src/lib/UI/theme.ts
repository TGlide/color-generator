export const theme = {
	palette: {
		red10: 'var(--palette-red-10)',
		red20: 'var(--palette-red-20)',
		red30: 'var(--palette-red-30)',
		red40: 'var(--palette-red-40)',
		red50: 'var(--palette-red-50)',
		red60: 'var(--palette-red-60)',
		red70: 'var(--palette-red-70)',
		red80: 'var(--palette-red-80)',
		red90: 'var(--palette-red-90)',
		red100: 'var(--palette-red-100)',
		blue10: 'var(--palette-blue-10)',
		blue20: 'var(--palette-blue-20)',
		blue30: 'var(--palette-blue-30)',
		blue40: 'var(--palette-blue-40)',
		blue50: 'var(--palette-blue-50)',
		blue60: 'var(--palette-blue-60)',
		blue70: 'var(--palette-blue-70)',
		blue80: 'var(--palette-blue-80)',
		blue90: 'var(--palette-blue-90)',
		blue100: 'var(--palette-blue-100)',
		white: 'var(--white)',
		black: 'var(--black)'
	},
	colors: {
		bg: 'var(--bg)',
		primary: 'var(--primary)'
	},
	fontFamilies: {
		sans: 'var(--font-sans)',
		mono: 'var(--font-mono)'
	}
};

export type Palette = keyof typeof theme['palette'];

export function isPalette(color: string): color is Palette {
	return Object.keys(theme.palette).includes(color);
}

export type Color = keyof typeof theme['colors'];

export function isColor(color: string): color is Color {
	return Object.keys(theme.colors).includes(color);
}

export type FontFamily = keyof typeof theme['fontFamilies'];

export function isFontFamily(fontFamily: string): fontFamily is FontFamily {
	return Object.keys(theme.fontFamilies).includes(fontFamily);
}
