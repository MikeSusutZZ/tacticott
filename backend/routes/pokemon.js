const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

// Get all Pokémon
router.get('/', pokemonController.getAllPokemon);

// Get a specific Pokémon by name
router.get('/:name', pokemonController.getPokemonByName);

// Add or update a Pokémon entry
router.post('/', pokemonController.addOrUpdatePokemon);

router.get('/test', async (req, res) => res.send('hello'))

module.exports = router;
