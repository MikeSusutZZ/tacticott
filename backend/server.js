const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const pokemonRoutes = require('./routes/pokemon');

// Enable CORS before defining any routes
app.use(cors()); 

// Middleware to parse JSON bodies
app.use(express.json());

// Define routeshttps://github.com/MikeSusutZZ/tacticott.git
app.use('/api/pokemon', pokemonRoutes);

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.log(err));

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
