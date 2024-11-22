// Express.js application that performs three statistical operations given an arbitrary amount of numbers:

// 1. **mean** (average)
// 2. **median** (midpoint)
// 3. **mode** (most frequent)

// The operations are invoked via **one route per operation**.

// REQUIREMENTS

// - The three base routes are /mean, /median, /mode --> All accept GET requests

// - Each route takes a 'query key' of' nums' which is a 'comma separated list of numbers'. For example, if I want to get the mean of 1, 3, 5, and 7, that would look like:

//     Be a GET request to /mean?nums=1,3,5,7 on the URL.

// The 'response' of each operation should be JSON which looks like this:

//     response: {
//         operation: "mean",
//         value: 4
//     }

const express = require('express');
const app = express();

// Helper function to parse and validate 'nums' query parameter
function parseNumbers(numsString) {
    if (!numsString) {
        throw new Error("nums are required.");
    }

    const nums = numsString.split(',').map((n) => {
        const parsed = Number(n);
        if (isNaN(parsed)) {
            throw new Error(`${n} is not a number.`);
        }
        return parsed;
    });

    return nums;
}

// Helper function to calculate mean
function calculateMean(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

// Helper function to calculate median
function calculateMedian(numbers) {
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(numbers.length / 2);

    if (numbers.length % 2 === 0) {
        return (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
        return sorted[mid];
    }
}

// Helper function to calculate mode
function calculateMode(numbers) {
    const frequency = {};
    let maxFreq = 0;
    let mode = [];

    for (let num of numbers) {
        frequency[num] = (frequency[num] || 0) + 1;
        if (frequency[num] > maxFreq) {
            maxFreq = frequency[num];
        }
    }

    for (let key in frequency) {
        if (frequency[key] === maxFreq) {
            mode.push(Number(key));
        }
    }

    return mode.length === 1 ? mode[0] : mode;
}

// Route for mean
app.get('/mean', (req, res) => {
    try {
        const numbers = parseNumbers(req.query.nums);
        const mean = calculateMean(numbers);
        res.json({ operation: 'mean', value: mean });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route for median
app.get('/median', (req, res) => {
    try {
        const numbers = parseNumbers(req.query.nums);
        const median = calculateMedian(numbers);
        res.json({ operation: 'median', value: median });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route for mode
app.get('/mode', (req, res) => {
    try {
        const numbers = parseNumbers(req.query.nums);
        const mode = calculateMode(numbers);
        res.json({ operation: 'mode', value: mode });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

module.exports = { calculateMean, calculateMedian, calculateMode };
