import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import './Entry.css'; // Import the CSS file

const backend = 'http://localhost:5000';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Entry() {
  const query = useQuery();
  const initialPokemonName = query.get('name');
  const [pokemonName, setPokemonName] = useState(initialPokemonName || '');
  const [monData, setMonData] = useState(null);
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    off: '',
    ssu: '',
    asa: '',
    sus: '',
    obs: '',
    blk: '',
    speed: 'Doesn\'t use priority',
  });

  useEffect(() => {
    if (pokemonName) {
      fetchPokemonData(pokemonName);
    }
  }, [pokemonName]);

  const fetchPokemonData = (name) => {
    axios.get(`${backend}/api/pokemon/${name.toLowerCase()}`)
      .then(response => {
        setMonData(response.data);
        setFormData({
          off: response.data.stats.off.average || '',
          ssu: response.data.stats.ssu.average || '',
          asa: response.data.stats.asa.average || '',
          sus: response.data.stats.sus.average || '',
          obs: response.data.stats.obs.average || '',
          blk: response.data.stats.blk.average || '',
          speed: response.data.stats.speed || 'Doesn\'t use priority',
        });
      })
      .catch(error => {
        console.error('Error fetching Pokémon data from backend:', error);
        setMonData(null);
      });
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.pokemonName.value.trim();

    if (name) {
      setPokemonName(name);
      fetchPokemonData(name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newFormData = {
      off: parseInt(form.off.value) || 0,
      ssu: parseInt(form.ssu.value) || 0,
      asa: parseInt(form.asa.value) || 0,
      sus: parseInt(form.sus.value) || 0,
      obs: parseInt(form.obs.value) || 0,
      blk: parseInt(form.blk.value) || 0,
      speed: form.speed.value,
    };

    try {
      const response = await axios.post(`${backend}/api/pokemon`, {
        pokemon_name: pokemonName,
        stats: newFormData,
        password: form.password.value,
      });

      if (response.status === 200) {
        window.location.href = '/thank-you';
      }
    } catch (error) {
      console.error('Error submitting Pokémon data:', error);
    }
  };

  return (
    <Container className="entry-container">
      {!pokemonName ? (
        <div>
          <h1 className="entry-header">Enter Pokémon Name</h1>
          <Form onSubmit={handleNameSubmit} className="entry-form">
            <Form.Group className="mb-3 entry-form-control">
              <Form.Label>Pokémon Name</Form.Label>
              <Form.Control
                type="text"
                name="pokemonName"
                placeholder="Enter Pokémon Name"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="entry-button">
              Confirm
            </Button>
          </Form>
        </div>
      ) : (
        <>
          <h1 className="entry-header">Rate {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</h1>
          <Row>
            <Col md={6}>
              <Form onSubmit={handleSubmit} className="entry-form">
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3 entry-form-control">
                      <Form.Label>Offense (0-100)</Form.Label>
                      <Form.Control
                        type="number"
                        name="off"
                        defaultValue={formData.off}
                        min="0"
                        max="100"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3 entry-form-control">
                      <Form.Label>Self Set-up (0-100)</Form.Label>
                      <Form.Control
                        type="number"
                        name="ssu"
                        defaultValue={formData.ssu}
                        min="0"
                        max="100"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3 entry-form-control">
                      <Form.Label>Ally Setability (0-100)</Form.Label>
                      <Form.Control
                        type="number"
                        name="asa"
                        defaultValue={formData.asa}
                        min="0"
                        max="100"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3 entry-form-control">
                      <Form.Label>Set up Support (0-100)</Form.Label>
                      <Form.Control
                        type="number"
                        name="sus"
                        defaultValue={formData.sus}
                        min="0"
                        max="100"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3 entry-form-control">
                      <Form.Label>Obstructive Support (0-100)</Form.Label>
                      <Form.Control
                        type="number"
                        name="obs"
                        defaultValue={formData.obs}
                        min="0"
                        max="100"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3 entry-form-control">
                      <Form.Label>Bulk (0-100)</Form.Label>
                      <Form.Control
                        type="number"
                        name="blk"
                        defaultValue={formData.blk}
                        min="0"
                        max="100"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3 entry-form-control">
                      <Form.Label>Speed</Form.Label>
                      <Form.Control
                        as="select"
                        name="speed"
                        defaultValue={formData.speed}
                        required
                      >
                        <option>Boosted by abilities/moves</option>
                        <option>Doesn't use priority</option>
                        <option>Some use of priority</option>
                        <option>Relies on priority</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3 entry-form-control">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="entry-button">Submit</Button>
              </Form>
            </Col>
            <Col md={6} className="pokemon-card-container">
              {monData ? (
                <PokemonCard pokemon={monData} />
              ) : (
                <p>This Pokémon may not have any entries...</p>
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default Entry;
