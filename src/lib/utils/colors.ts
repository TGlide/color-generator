import { parseToHsla } from 'color2k';
import { decimalToPercent } from './number';

export const getHSLA = (color: string): string[] | null => {
	try {
		const [h, s, l, a] = parseToHsla(color);
		return [h.toFixed(2), decimalToPercent(s), decimalToPercent(l), decimalToPercent(a)];
	} catch {
		return null;
	}
};
