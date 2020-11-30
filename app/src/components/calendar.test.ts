import { moodValueToColor } from "./calendar";
import cases from 'jest-in-case';

cases('should calculate color correctly', opts => {
	const result = moodValueToColor(opts.moodValue);
	expect(result).toBe(opts.color);
  }, [
	{ name: 'color test 1', moodValue: 1, color: 'dark-slate-blue' },
	{ name: 'color test 2', moodValue: 1.5, color: "dark-moderate-blue" },
	{ name: 'color test 3', moodValue: 2, color: "sapphire-blue" },
	{ name: 'color test 4', moodValue: 2.5, color: "dark-blue" },
	{ name: 'color test 5', moodValue: 3, color: "blue-munsell" },
	{ name: 'color test 6', moodValue: 3.5, color: "dark-cyan" },
	{ name: 'color test 7', moodValue: 4, color: "keppel" },
	{ name: 'color test 8', moodValue: 4.5, color: 'strong-cyan-lime' },
	{ name: 'color test 9',  moodValue: 5, color: 'medium-aquamarine' },
	{ name: 'color test 10', moodValue: 5.5, color: 'soft-cyan-lime' },
	{ name: 'color test 11', moodValue: 6, color: 'light-green' },
	{ name: 'color test 12', moodValue: 6.5, color: 'soft-green' },
	{ name: 'color test 13', moodValue: 7, color: 'inchworm' },
	{ name: 'color test 14', moodValue: 7.5, color: 'soft-yellow' },
	{ name: 'color test 15', moodValue: 8, color: 'corn' },
	{ name: 'color test 16', moodValue: 8.5, color: 'sunshine-yellow' },
	{ name: 'color test 17', moodValue: 9, color: 'maize-crayola' },
	{ name: 'color test 18', moodValue: 9.5, color: 'soft-orange' },
	{ name: 'color test 19', moodValue: 10, color: 'sandy-brown' },
]);