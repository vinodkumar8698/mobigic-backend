const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
// const { nanoid } = require('nanoid');
const File = require('../models/File');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory where files will be uploaded
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `vinod-${Date.now()}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

// Initialize multer with the configured storage
const upload = multer({ storage });

// Upload file route
router.post('/', auth, upload.single('file'), async (req, res) => {
    try {
        const { filename, path } = req.file;
        const { userId } = req.userData;
        const code = Math.floor(100000 + Math.random() * 900000); // Generate a unique 6-digit code
        const file = new File({ user: userId, fileName: filename, filePath: path, code });
        await file.save(); // Save file details to MongoDB
        res.status(201).json({ message: 'File uploaded successfully', code });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: error.message });
    }
});

// List files route
router.get('/', auth, async (req, res) => {
    try {
        const { userId } = req.userData;
        const files = await File.find({ user: userId });
        res.status(200).json(files);
    } catch (error) {
        console.log("error", error);

        res.status(500).json({ message: error.message });
    }
});

// Delete file route
router.delete('/:id', auth, async (req, res) => {
    try {
        const { userId } = req.userData;
        const file = await File.findOne({ _id: req.params.id, user: userId });
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        await File.deleteOne({ _id: req.params.id, user: userId }); // Remove file from MongoDB
        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
