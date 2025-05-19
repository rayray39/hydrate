const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/hydration.json');

const allowedLabels = ['water', 'coffee', 'tea'];

// Helper: read and write to JSON file
const readData = () => {
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, '{}');
    }
    const file = fs.readFileSync(dataPath, 'utf8');
    return file ? JSON.parse(file) : {};
};

const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Get all hydration logs, for a specific drink (label) and for today only
router.get('/', (req, res) => {
    const label = req.query.label;
    const date = req.query.date;
    if (!label || !date) {
        return res.status(400).json({ message: 'Missing label and/or date.' });
    }

    const allData = readData();
    if (!allData) {
        return res.status(500).json({ message: 'Error in fetching all hydration data.' });
    }

    const todayData = allData[date][label];
    if (todayData) {
        return res.status(200).json({ todayData: todayData, message: "Successfully fetched today's hydration data." });
    } else {
        return res.status(500).json({ message: "Error in fetching today's hydration data." });
    }
});

// Record a drink
router.post('/', (req, res) => {
    const { date, label, amount } = req.body;

    if (!allowedLabels.includes(label)) {
        return res.status(400).json({ message: 'Invalid label provided.' });
    }
    if (typeof amount !== "number" || amount < 0) {
        return res.status(400).json({ message: 'Amount cannot be negative and must be a number.' });
    }
    if (!date || !label) {
        return res.status(400).json({ message: 'Missing date or label.' });
    }

    const data = readData();

    if (!data[date]) {
        // if today's date is not in the data yet, i.e. first drink of the day
        data[date] = { water: 0, coffee: 0, tea: 0 };
    }

    // always round the total amount to 1dp
    data[date][label] = Math.round((data[date][label] + amount) * 10) / 10;
    writeData(data);

    return res.json({ message: `Added ${amount.toFixed(1)}L of ${label} to ${date}` });
});

// Get all hydration logs, everything in the database
router.get('/all', (req, res) => {
    const allData = readData();
    if (!allData) {
        return res.status(500).json({ message: 'Error in fetching all hydration data.' });
    } else {
        return res.status(200).json({ allData: allData, message: "Successfully fetched all hydration data." });
    }
});

module.exports = router;
