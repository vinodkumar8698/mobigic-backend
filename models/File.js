const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fileName: String,
    filePath: String,
    code: String,
});

module.exports = mongoose.model('File', fileSchema);
