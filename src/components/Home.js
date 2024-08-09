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
      <h1 className="text-center my-4">Tacticott</h1>
      <iframe
        title="Tacticott Intro"
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <Form className="my-4">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search for a Pokémon"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSearch} className="mt-2">Search</Button>
      </Form>
      <Row>
        {pokemonList.map((pokemon, index) => (
          <Col key={index} md={4} className="mb-4">
            <PokemonCard pokemon={pokemon} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;

