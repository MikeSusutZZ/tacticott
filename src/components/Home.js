import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import PokemonCard from './PokemonCard';

const PORT = 'http://localhost:5000'

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch Pokémon from the backend
    axios.get(`${PORT}/api/pokemon`)
      .then(response => setPokemonList(response.data))
      .catch(error => console.error('Error fetching Pokémon data:', error));
  }, []);

  const handleSearch = () => {
    // Handle search logic here
    if (!searchQuery) {
      axios.get(`${PORT}/api/pokemon`)
        .then(response => setPokemonList(response.data))
        .catch(error => console.error('Error fetching Pokémon data:', error));
    } else {
      axios.get(`${PORT}/api/pokemon/${searchQuery}`)
        .then(response => setPokemonList([response.data]))
        .catch(error => console.error('Error fetching Pokémon data:', error));
    }
  };

  return (
    <Container>
      <h1 className="text-center my-4">Tacticott Alpha 0.2</h1>
      <iframe
        title="Tacticott Intro"
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <h2 className="text-center my-4">This is a work in progress!</h2>
      <p>There are plenty of features yet to come, lots of styling to adjust, and probably some bugs here and there tool.
          If you have me on discord, please reach out with any suggestions or bug finds!
          In order to contribute to a pokemons rating, you will need the password, which is being limitedly distributed to avoid trolls until the data is more stable. Thanks for checking out the site while it's still in it's infancy! -ZippidyZap @ VoltageVGC
      </p>
      <p>There are a LOT of pokemon that need added, so please click "Make an Entry" at the top to add your favorite mons!</p>
      <div className="pokemon-card-container">
      {pokemonList.map(pokemon => (
        <PokemonCard key={pokemon.pokemon_name} pokemon={pokemon} />
      ))}
    </div>
    </Container>
  );
}

export default Home;

