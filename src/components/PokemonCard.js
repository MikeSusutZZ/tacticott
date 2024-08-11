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

function getSpeedWarning(pokemon){
  switch(pokemon.stats.speed) {
    case "Some use of priority":
      return "*"
    case "Relies on priority":
      return "!"
    default:
      return ""
  }
}

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

    // Extract speed stat from mondata, or use a default value if mondata is not available yet
    const speedStat = mondata ? mondata.stats.find(stat => stat.stat.name === 'speed').base_stat : 0;

    return (
      <Card>
        {pokemon.entry_count < 15 && (
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#BB0000"><path d="M120-160v-66.67h480V-160H120Zm519.93-286.67q-80.26 0-136.76-56.57-56.5-56.57-56.5-136.83 0-80.26 56.57-136.76 56.57-56.5 136.83-56.5 80.26 0 136.76 56.57 56.5 56.57 56.5 136.83 0 80.26-56.57 136.76-56.57 56.5-136.83 56.5ZM120-493.33V-560h258.67q5.88 18.21 13.44 34.77 7.56 16.56 17.22 31.9H120Zm0 166.66v-66.66h404.67q16.86 8.91 35.93 14.95 19.07 6.05 39.4 8.71v43H120ZM620-600h40v-160h-40v160Zm20 80q8 0 14-6t6-14q0-8-6-14t-14-6q-8 0-14 6t-6 14q0 8 6 14t14 6Z"/></svg>          )}
        <Card.Img variant="top" src={imageUrl} alt={pokemon.pokemon_name} />
        <Card.Body>
        <Card.Title>{pokemon.pokemon_name.charAt(0).toUpperCase() + pokemon.pokemon_name.slice(1)}</Card.Title>
        <Radar
            data={{
              labels: ['Offense', 'Self Set-up', 'Allied Set-up', 'Set-up Support', 'Obs Support', 'Bulk'],
              datasets: [
                {
                    label: pokemon.pokemon_name.charAt(0).toUpperCase() + pokemon.pokemon_name.slice(1),
                  data: [
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
          <Link to={`/entry?name=${pokemon.pokemon_name}`}>
            <Button variant="primary" className="mt-3">Contribute your rating!</Button>
          </Link>
        </Card.Body>
      </Card>
    );
}

export default PokemonCard;
