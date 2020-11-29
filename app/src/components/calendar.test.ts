import { moodValueToColor } from "./calendar";

test('calendar' () => {
	it('should calculate color correctly', () => {
		const result = moodValueToColor(3.4)
		expect(result).toBe("dark-cyan")
	})
});