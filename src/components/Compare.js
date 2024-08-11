import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import { Radar } from 'react-chartjs-2';
import './Compare.css'; // Import the CSS file

function Compare() {
  const [pokemonNames, setPokemonNames] = useState(['', '', '', '', '', '']);
  const [comparisonData, setComparisonData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responses = await Promise.all(
        pokemonNames.filter(name => name).map(name => axios.get(`https://tacticott.onrender.com/api/pokemon/${name.toLowerCase()}`))
      );
      setComparisonData(responses.map(res => res.data));
    } catch (error) {
      console.error('Error comparing Pokémon:', error);
    }
  };

  const colors = [
    { backgroundColor: 'rgba(34, 202, 236, 0.2)', borderColor: 'rgba(34, 202, 236, 1)' },
    { backgroundColor: 'rgba(255, 99, 132, 0.2)', borderColor: 'rgba(255, 99, 132, 1)' },
    { backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)' },
    { backgroundColor: 'rgba(255, 205, 86, 0.2)', borderColor: 'rgba(255, 205, 86, 1)' },
    { backgroundColor: 'rgba(153, 102, 255, 0.2)', borderColor: 'rgba(153, 102, 255, 1)' },
    { backgroundColor: 'rgba(255, 159, 64, 0.2)', borderColor: 'rgba(255, 159, 64, 1)' },
  ];

  return (
    <Container className="compare-container">
      <h1 className="compare-header">Compare Pokémon</h1>
      <Form onSubmit={handleSubmit} className="compare-form">
        <Row>
          {pokemonNames.map((name, index) => (
            <Col key={index} md={2} className="mb-3 compare-form-control">
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
        <Button variant="primary" type="submit" className="compare-button mt-4">
          Compare
        </Button>
      </Form>
      {comparisonData.length > 0 && (
        <>
          <div className="pokemon-card-container">
            {comparisonData.map((pokemon, index) => (
              <div key={index} className="pokemon-card-col">
                <PokemonCard pokemon={pokemon} />
              </div>
            ))}
          </div>
          <div className="radar-chart-container">
            <Radar
              data={{
                labels: ['Offense', 'Self Set-up', 'Allied Set-up', 'Bulk', 'Set-up Support', 'Obs Support'],
                datasets: comparisonData.map((pokemon, index) => ({
                  label: pokemon.pokemon_name,
                  data: [
                    pokemon.stats.off.average,
                    pokemon.stats.ssu.average,
                    pokemon.stats.asa.average,
                    pokemon.stats.blk.average,
                    pokemon.stats.sus.average,
                    pokemon.stats.obs.average,
                  ],
                  backgroundColor: colors[index].backgroundColor,
                  borderColor: colors[index].borderColor,
                  borderWidth: 2,
                })),
              }}
              options={{
                scales: {
                  r: {
                    beginAtZero: true,
                    max: 100,
                  },
                },
              }}
            />
          </div>
        </>
      )}
    </Container>
  );
}

export default Compare;
