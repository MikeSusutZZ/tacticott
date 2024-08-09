import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

function PokemonCard({ pokemon }) {
    const [mondata, setMondata] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Fetch the Pokémon data when the component mounts or when the pokemon name changes
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon_name.toLowerCase()}`)
            .then(response => setMondata(response.data))
            .catch(error => {
                console.error('Error fetching Pokémon data:', error);
                setError(true);  // Set error state to true if the request fails
            });
    }, [pokemon.pokemon_name]);

    // Fallback image URL
    const fallbackImageUrl = 'https://archives.bulbagarden.net/media/upload/thumb/a/a1/Substitute_artwork.png/250px-Substitute_artwork.png';

    // Use the fetched image URL or fallback if there's an error
    const imageUrl = error || !mondata ? fallbackImageUrl : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mondata.id}.png`;

    return (
      <Card>
        <Card.Img variant="top" src={imageUrl} alt={pokemon.pokemon_name} />
        <Card.Body>
        <Card.Title>{pokemon.pokemon_name.charAt(0).toUpperCase() + pokemon.pokemon_name.slice(1)}</Card.Title>
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
