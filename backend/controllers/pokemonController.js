const Pokemon = require('../models/Pokemon');

// Helper function to calculate average
const calculateAverage = (entries) => {
    const sum = entries.reduce((a, b) => a + b, 0);
    return Math.round(sum / entries.length);
};

// Add or update a Pokémon entry
exports.addOrUpdatePokemon = async (req, res) => {
    const { pokemon_name, stats, password } = req.body;

    // Validate password
    if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({ message: 'Invalid password' });
    }

    // Validate input
    if (!pokemon_name || !stats || typeof stats !== 'object') {
        return res.status(400).json({ message: 'Invalid data provided' });
    }

    try {
        // Find existing Pokémon or create a new one
        let pokemon = await Pokemon.findOne({ pokemon_name });
        if (!pokemon) {
            pokemon = new Pokemon({ pokemon_name, stats: {}, entry_count: 0 });
        }

        // Update stats and recalculate averages
        const updatedStats = { ...pokemon.stats };
        for (let [key, value] of Object.entries(stats)) {
            if (!updatedStats[key]) {
                updatedStats[key] = { average: value, entries: [value] };
            } else {
                updatedStats[key].entries.push(value);
                updatedStats[key].average = calculateAverage(updatedStats[key].entries);
            }
        }

        pokemon.stats = updatedStats;
        pokemon.entry_count += 1;

        // Save to database
        await pokemon.save();

        res.status(200).json(pokemon);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add or update Pokémon entry' });
    }
};

// Get all Pokémon
exports.getAllPokemon = async (req, res) => {
    try {
        const pokemonList = await Pokemon.find();
        res.status(200).json(pokemonList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to retrieve Pokémon' });
    }
};

// Get a single Pokémon by name
exports.getPokemonByName = async (req, res) => {
    try {
        const pokemon = await Pokemon.findOne({ pokemon_name: req.params.name });
        if (!pokemon) {
            return res.status(404).json({ message: 'Pokémon not found' });
        }
        res.status(200).json(pokemon);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to retrieve Pokémon' });
    }
};
