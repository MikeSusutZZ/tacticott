const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const pokemonRoutes = require('./routes/pokemon');

app.use(express.json());
app.use('/api/pokemon', pokemonRoutes);


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
