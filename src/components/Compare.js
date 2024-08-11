import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import { Radar } from 'react-chartjs-2';

function Compare() {
  const [pokemonNames, setPokemonNames] = useState(['', '', '', '']);
  const [comparisonData, setComparisonData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responses = await Promise.all(
        pokemonNames.filter(name => name).map(name => axios.get(`http://localhost:5000/api/pokemon/${name.toLowerCase()}`))
      );
      setComparisonData(responses.map(res => res.data));
    } catch (error) {
      console.error('Error comparing Pokémon:', error);
    }
  };

  const colors = [
    { backgroundColor: 'rgba(34, 202, 236, 0.2)', borderColor: 'rgba(34, 202, 236, 1)' },  // Blue
    { backgroundColor: 'rgba(255, 99, 132, 0.2)', borderColor: 'rgba(255, 99, 132, 1)' },  // Red
    { backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)' },  // Green
    { backgroundColor: 'rgba(255, 205, 86, 0.2)', borderColor: 'rgba(255, 205, 86, 1)' },  // Yellow
  ];

  return (
    <Container>
      <h1 className="text-center my-4">Compare Pokémon</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          {pokemonNames.map((name, index) => (
            <Col key={index} md={3} className="mb-3">
              <Form.Group>
                <Form.Label>Pokémon Name {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={e => {
                    const newNames = [...pokemonNames];
                    newNames[index] = e.target.value;
                    setPokemonNames(newNames);
                  }}
                />
              </Form.Group>
            </Col>
          ))}
        </Row>
        <Button variant="primary" type="submit" className="mt-4">
          Compare
        </Button>
      </Form>
      {comparisonData.length > 0 && (
        <>
          <Row className="mt-5">
            {comparisonData.map((pokemon, index) => (
              <Col key={index} md={3} className="mb-4">
                <PokemonCard pokemon={pokemon} />
              </Col>
            ))}
          </Row>
          <Radar
            data={{
              labels: ['Off', 'SSu', 'ASa', 'SuS', 'ObS', 'Blk'],
              datasets: comparisonData.map((pokemon, index) => ({
                label: pokemon.pokemon_name,
                data: [
                  pokemon.stats.off.average,
                  pokemon.stats.ssu.average,
                  pokemon.stats.asa.average,
                  pokemon.stats.sus.average,
                  pokemon.stats.obs.average,
                  pokemon.stats.blk.average
                ],
                backgroundColor: colors[index].backgroundColor,
                borderColor: colors[index].borderColor,
                borderWidth: 2
              }))
            }}
            options={{
              scales: {
                r: {
                  beginAtZero: true,
                  max: 100
                }
              }
            }}
          />
        </>
      )}
    </Container>
  );
}

export default Compare;
