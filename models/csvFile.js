// models/csvFile.js
const mongoose = require('mongoose');

const csvFileSchema = new mongoose.Schema({
    fileId: { type: String, required: true, unique: true },
    originalFilename: { type: String, required: true },
    month: { type: String, required: true },
    subject: { type: String, required: true },
    grade: { type: String, required: true },
    labels: { type: [String], required: false }, // if you have additional labels
    filePath: { type: String, required: true }
});

module.exports = mongoose.model('CSVFile', csvFileSchema);
