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
  const { name } = req.params;
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

  // Validate the password
  if (password !== process.env.SECRET_PASSWORD) {
    return res.status(401).send('Unauthorized');
  }

  try {
    let pokemon = await Pokemon.findOne({ pokemon_name });

    if (!pokemon) {
      // Create a new Pokémon entry if it doesn't exist
      pokemon = new Pokemon({
        pokemon_name,
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
        pokemon.stats[statName].average = sum / pokemon.stats[statName].entries.length;
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
    res.status(200).send('Pokemon stats updated successfully');
  } catch (error) {
    console.error('Error updating Pokémon stats:', error);
    res.status(500).send('Server error');
  }
};
