const { calculateMean, calculateMedian, calculateMode } = require('./app');

describe('Statistical Calculations', () => {
    test('calculateMean returns the correct mean', () => {
        expect(calculateMean([1, 2, 3, 4])).toBe(2.5);
        expect(calculateMean([10, 20, 30])).toBe(20);
    });

    test('calculateMedian returns the correct median', () => {
        expect(calculateMedian([1, 2, 3])).toBe(2);
        expect(calculateMedian([1, 2, 3, 4])).toBe(2.5);
    });

    test('calculateMode returns the correct mode', () => {
        expect(calculateMode([1, 2, 2, 3])).toBe(2);
        expect(calculateMode([1, 1, 2, 2, 3])).toEqual([1, 2]); // Multiple modes
    });
});
