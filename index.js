const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const app = express();

const DB = "mongodb+srv://vinay8698:Smart%40123@vinay8698.kvuxg.mongodb.net/?retryWrites=true&w=majority";

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB

// Database Connection
mongoose.set('strictQuery', false);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
    })
    .then(() => {
        console.log(`Database connected successful`);
    })
    .catch((err) => console.log(err, "no connection"));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
