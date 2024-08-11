import React, { useState } from 'react';
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
  const [formData, setFormData] = useState({
    off: 0,
    ssu: 0,
    asa: 0,
    sus: 0,
    obs: 0,
    blk: 0,
    speed: 'Doesn\'t use priority',
  });

  // Fetch Pokémon data from your backend (database) when the component mounts
  if (pokemonName && !monData) {
    axios.get(`${backend}/api/pokemon/${pokemonName.toLowerCase()}`)
      .then(response => {
        setMonData(response.data); // Set the entire response data to monData
        // Set form data based on fetched data
        setFormData({
          off: response.data.stats.off || 0,
          ssu: response.data.stats.ssu || 0,
          asa: response.data.stats.asa || 0,
          sus: response.data.stats.sus || 0,
          obs: response.data.stats.obs || 0,
          blk: response.data.stats.blk || 0,
          speed: response.data.stats.speed || 'Doesn\'t use priority',
        });
      })
      .catch(error => {
        console.error('Error fetching Pokémon data from backend:', error);
        setMonData(null);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backend}/api/pokemon`, {
        pokemon_name: pokemonName,
        stats: formData, // Use formData for submission
        password,
      });

      if (response.status === 200) {
        window.location.href = '/thank-you';
      }
    } catch (error) {
      console.error('Error submitting Pokémon data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
                    name="off"
                    value={formData.off}
                    onChange={handleInputChange}
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
                    name="ssu"
                    value={formData.ssu}
                    onChange={handleInputChange}
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
                    name="asa"
                    value={formData.asa}
                    onChange={handleInputChange}
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
                    name="sus"
                    value={formData.sus}
                    onChange={handleInputChange}
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
                    name="obs"
                    value={formData.obs}
                    onChange={handleInputChange}
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
                    name="blk"
                    value={formData.blk}
                    onChange={handleInputChange}
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
                    name="speed"
                    value={formData.speed}
                    onChange={handleInputChange}
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
