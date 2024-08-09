import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Entry() {
  const [pokemonName, setPokemonName] = useState('');
  const [stats, setStats] = useState({
    off: 0,
    ssu: 0,
    asa: 0,
    sus: 0,
    obs: 0,
    blk: 0,
    speed: 0
  });
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/pokemon', {
        pokemon_name: pokemonName,
        stats,
        password
      });
      if (response.status === 200) {
        navigate('/thank-you');
      }
    } catch (error) {
      console.error('Error submitting Pokémon data:', error);
    }
  };

  return (
    <Container>
      <h1 className="text-center my-4">Rate a Pokémon</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Pokémon Name</Form.Label>
          <Form.Control
            type="text"
            value={pokemonName}
            onChange={e => setPokemonName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Speed (0-100)</Form.Label>
          <Form.Control
            type="number"
            value={stats.speed}
            onChange={e => setStats({ ...stats, speed: e.target.value })}
            min="0"
            max="100"
            required
          />
        </Form.Group>
        {/* Add other stat inputs similarly */}
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Entry;
