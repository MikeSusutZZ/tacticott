const mongoose = require('mongoose');

// Define the schema for numerical stats
const StatSchema = new mongoose.Schema({
  average: {
    type: Number,
    default: 0,
  },
  entries: {
    type: [Number],
    default: [],
  },
});

// Define the schema for the Pokémon model
const PokemonSchema = new mongoose.Schema({
  pokemon_name: {
    type: String,
    required: true,
    unique: true,
  },
  stats: {
    speed: {
      type: String, // Keep speed as a string to represent priority level
      required: true,
    },
    off: StatSchema,  // Offense
    ssu: StatSchema,  // Self Set-up
    asa: StatSchema,  // Ally Setability
    sus: StatSchema,  // Set up Support
    obs: StatSchema,  // Obstructive Support
    blk: StatSchema,  // Bulk
  },
  entry_count: {
    type: Number,
    default: 0,
  },
});

// Create and export the model
const Pokemon = mongoose.model('Pokemon', PokemonSchema);
module.exports = Pokemon;
