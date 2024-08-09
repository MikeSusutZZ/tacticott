import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Radar } from 'react-chartjs-2';

function PokemonCard({ pokemon }) {
  return (
    <Card>
      <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokemon_name.toLowerCase()}.png`} />
      <Card.Body>
        <Card.Title>{pokemon.pokemon_name}</Card.Title>
        <Radar
          data={{
            labels: ['Speed', 'Off', 'SSu', 'ASa', 'SuS', 'ObS', 'Blk'],
            datasets: [
              {
                label: `${pokemon.pokemon_name} Stats`,
                data: [
                  pokemon.stats.speed.average,
                  pokemon.stats.off.average,
                  pokemon.stats.ssu.average,
                  pokemon.stats.asa.average,
                  pokemon.stats.sus.average,
                  pokemon.stats.obs.average,
                  pokemon.stats.blk.average,
                ],
                backgroundColor: 'rgba(34, 202, 236, 0.2)',
                borderColor: 'rgba(34, 202, 236, 1)',
                borderWidth: 2,
              },
            ],
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
        {pokemon.entry_count < 15 && (
          <span className="text-danger">!</span>
        )}
        <Link to={`/entry?name=${pokemon.pokemon_name}`}>
          <Button variant="primary" className="mt-3">Contribute your rating!</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;
