const axios = require('axios');
const Pokemon = require('../models/Pokemon');

// Get all Pokémon
exports.getAllPokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.find();
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a specific Pokémon by name
exports.getPokemonByName = async (req, res) => {
  const name = req.params.name.toLowerCase(); // Normalize name to lowercase
  try {
    const pokemon = await Pokemon.findOne({ pokemon_name: name });
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokémon not found' });
    }
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add or update a Pokémon entry
exports.addOrUpdatePokemon = async (req, res) => {
  const { pokemon_name, stats, password } = req.body;

  // Normalize name to lowercase
  const normalizedPokemonName = pokemon_name.toLowerCase();

  // Validate the password
  if (password !== process.env.SECRET_PASSWORD) {
    return res.status(401).send('Unauthorized');
  }

  try {
    // Check if the Pokémon name is valid by querying the PokéAPI
    const pokeApiUrl = `https://pokeapi.co/api/v2/pokemon/${normalizedPokemonName}`;
    let isValidPokemon = false;

    try {
      await axios.get(pokeApiUrl);
      isValidPokemon = true;
    } catch (error) {
      // If the PokéAPI returns a 404 error, the Pokémon name is invalid
      if (error.response && error.response.status === 404) {
        return res.status(400).send('Invalid Pokémon name');
      } else {
        console.error('Error fetching Pokémon from PokéAPI:', error);
        return res.status(500).send('Error checking Pokémon name with PokéAPI');
      }
    }

    if (!isValidPokemon) {
      return res.status(400).send('Invalid Pokémon name');
    }

    // If valid, proceed with adding or updating the Pokémon in the database
    let pokemon = await Pokemon.findOne({ pokemon_name: normalizedPokemonName });

    if (!pokemon) {
      // Create a new Pokémon entry if it doesn't exist
      pokemon = new Pokemon({
        pokemon_name: normalizedPokemonName,
        stats: {
          speed: stats.speed, // Directly store the string value for speed
          off: { average: stats.off, entries: [stats.off] },
          ssu: { average: stats.ssu, entries: [stats.ssu] },
          asa: { average: stats.asa, entries: [stats.asa] },
          sus: { average: stats.sus, entries: [stats.sus] },
          obs: { average: stats.obs, entries: [stats.obs] },
          blk: { average: stats.blk, entries: [stats.blk] },
        },
        entry_count: 1,
      });
    } else {
      // Update existing Pokémon's stats
      pokemon.entry_count += 1;

      const updateStat = (statName) => {
        pokemon.stats[statName].entries.push(stats[statName]);
        const sum = pokemon.stats[statName].entries.reduce((a, b) => a + b, 0);
        pokemon.stats[statName].average = Math.round(sum / pokemon.stats[statName].entries.length);
      };

      // Update each numerical stat
      updateStat('off');
      updateStat('ssu');
      updateStat('asa');
      updateStat('sus');
      updateStat('obs');
      updateStat('blk');

      // Directly update the speed field as a string
      pokemon.stats.speed = stats.speed;
    }

    await pokemon.save();
    res.status(200).send('Pokémon stats updated successfully');
  } catch (error) {
    console.error('Error updating Pokémon stats:', error);
    res.status(500).send('Server error');
  }
};
