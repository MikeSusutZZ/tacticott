import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import PokemonCard from './PokemonCard'; // Import the PokemonCard component

const backend = 'http://localhost:5000';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Entry() {
  const query = useQuery();
  const pokemonName = query.get('name');
  const [monData, setMonData] = useState(null);
  const [password, setPassword] = useState('');

  // Fetch Pokémon data from your backend (database)
  useEffect(() => {
    if (pokemonName) {
      axios.get(`${backend}/api/pokemon/${pokemonName.toLowerCase()}`) // Use the correct API route
        .then(response => {
          setMonData(response.data); // Set the entire response data to monData
        })
        .catch(error => {
          console.error('Error fetching Pokémon data from backend:', error);
          setMonData(null);
        });
    }
  }, [pokemonName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backend}/api/pokemon`, {
        pokemon_name: pokemonName,
        stats: monData.stats,
        password,
      });

      if (response.status === 200) {
        window.location.href = '/thank-you';
      }
    } catch (error) {
      console.error('Error submitting Pokémon data:', error);
    }
  };

  const handleStatChange = (stat, value) => {
    setMonData({
      ...monData,
      stats: {
        ...monData.stats,
        [stat]: value
      }
    });
  };

  return (
    <Container>
      <h1 className="text-center my-4">Rate {pokemonName ? pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1) : ''}</h1>
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Offense (0-100)</Form.Label>
                  <Form.Control
                    type="number"
                    value={monData ? monData.stats.off : 0}
                    onChange={e => handleStatChange('off', e.target.value)}
                    min="0"
                    max="100"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Self Set-up (0-100)</Form.Label>
                  <Form.Control
                    type="number"
                    value={monData ? monData.stats.ssu : 0}
                    onChange={e => handleStatChange('ssu', e.target.value)}
                    min="0"
                    max="100"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Ally Setability (0-100)</Form.Label>
                  <Form.Control
                    type="number"
                    value={monData ? monData.stats.asa : 0}
                    onChange={e => handleStatChange('asa', e.target.value)}
                    min="0"
                    max="100"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Set up Support (0-100)</Form.Label>
                  <Form.Control
                    type="number"
                    value={monData ? monData.stats.sus : 0}
                    onChange={e => handleStatChange('sus', e.target.value)}
                    min="0"
                    max="100"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Obstructive Support (0-100)</Form.Label>
                  <Form.Control
                    type="number"
                    value={monData ? monData.stats.obs : 0}
                    onChange={e => handleStatChange('obs', e.target.value)}
                    min="0"
                    max="100"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Bulk (0-100)</Form.Label>
                  <Form.Control
                    type="number"
                    value={monData ? monData.stats.blk : 0}
                    onChange={e => handleStatChange('blk', e.target.value)}
                    min="0"
                    max="100"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Speed</Form.Label>
                  <Form.Control
                    as="select"
                    value={monData ? monData.stats.speed : 'Doesn\'t use priority'}
                    onChange={e => handleStatChange('speed', e.target.value)}
                    required
                  >
                    <option>Doesn't use priority</option>
                    <option>Some use of priority</option>
                    <option>Relies on priority</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Col>
        <Col md={6}>
          {monData ? (
            <PokemonCard pokemon={monData} />
          ) : (
            <p>Loading Pokémon data...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Entry;
