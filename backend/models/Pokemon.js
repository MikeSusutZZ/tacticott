const mongoose = require('mongoose');

const StatSchema = new mongoose.Schema({
    average: {
        type: Number,
        required: true,
        default: 0,
    },
    entries: {
        type: [Number],
        required: true,
        default: [],
    },
});

const PokemonSchema = new mongoose.Schema({
    pokemon_name: {
        type: String,
        required: true,
        unique: true,
    },
    stats: {
        speed: StatSchema,
        off: StatSchema,
        ssu: StatSchema,
        asa: StatSchema,
        sus: StatSchema,
        obs: StatSchema,
        blk: StatSchema,
    },
    entry_count: {
        type: Number,
        required: true,
        default: 0,
    },
});

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = Pokemon;
