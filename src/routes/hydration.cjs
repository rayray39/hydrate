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

// Get all hydration logs
router.get('/', (req, res) => {
    const data = readData();
    if (data) {
        return res.status(200).json({ data: data, message: 'Successfully fetched all hydration data.' });
    } else {
        return res.status(500).json({ message: 'Error in fetching all hydration data.' });
    }
});

// Record a drink
router.post('/', (req, res) => {
    const { date, label, amount } = req.body;

    if (!allowedLabels.includes(label)) {
        return res.status(400).json({ message: 'Invalid label provided.' });
    }
    if (typeof amount !== number || number < 0) {
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

    data[date][label] += amount;
    writeData(data);

    return res.json({ message: `Added ${amount}L of ${label} to ${date}` });
});

module.exports = router;
