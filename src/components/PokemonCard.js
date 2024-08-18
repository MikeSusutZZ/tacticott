import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import './PokemonCard.css'; // Import the CSS file

// Register the necessary components for Chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ChartTooltip,
  Legend
);

// Define a mapping from Pokémon types to colors
const typeColors = {
  fire: 'rgba(240, 128, 48, 0.7)',   // #F08030
  water: 'rgba(104, 144, 240, 0.7)', // #6890F0
  grass: 'rgba(120, 200, 80, 0.7)',  // #78C850
  electric: 'rgba(248, 208, 48, 0.7)', // #F8D030
  ground: 'rgba(224, 192, 104, 0.7)', // #E0C068
  rock: 'rgba(184, 160, 56, 0.7)',   // #B8A038
  fairy: 'rgba(238, 153, 172, 0.7)', // #EE99AC
  poison: 'rgba(160, 64, 160, 0.7)', // #A040A0
  bug: 'rgba(168, 184, 32, 0.7)',    // #A8B820
  dragon: 'rgba(112, 56, 248, 0.7)', // #7038F8
  psychic: 'rgba(248, 88, 136, 0.7)', // #F85888
  flying: 'rgba(168, 144, 240, 0.7)', // #A890F0
  fighting: 'rgba(192, 48, 40, 0.7)', // #C03028
  normal: 'rgba(168, 168, 120, 0.7)', // #A8A878
  ghost: 'rgba(112, 88, 152, 0.7)',  // #705898
  dark: 'rgba(112, 88, 72, 0.7)',    // #705848
  steel: 'rgba(184, 184, 208, 0.7)', // #B8B8D0
  ice: 'rgba(152, 216, 216, 0.7)',   // #98D8D8
};


const options = {
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: {
        display: false, // This hides the numbers
        stepSize: 20,
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        title: function (tooltipItems) {
          const fullNames = {
            "Off": "Offense",
            "SSu": "Self Set-up",
            "ASa": "Allied Set-up",
            "Blk": "Bulk",
            "SuS": "Set-up Support",
            "ObS": "Obstructive Support"
          };
          const label = tooltipItems[0].label;
          return fullNames[label];
        }
      }
    }
  }
};




function PokemonCard({ pokemon }) {
  const [mondata, setMondata] = useState(null);
  const [error, setError] = useState(false);
  const [cardBackground, setCardBackground] = useState('#FFFFFF'); // Default background

  useEffect(() => {
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon_name.toLowerCase()}`
      )
      .then((response) => {
        setMondata(response.data);
        const types = response.data.types;
        const firstType = types[0].type.name;
        const secondType = types[1]?.type.name;

        if (secondType) {
          // If there's a second type, create a gradient
          setCardBackground(`linear-gradient(135deg, ${typeColors[firstType]} 45%, ${typeColors[secondType]} 55%)`);
        } else {
          // Otherwise, use a solid color
          setCardBackground(typeColors[firstType] || '#FFFFFF');
        }
      })
      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
        setError(true);
      });
  }, [pokemon.pokemon_name]);

  const fallbackImageUrl =
    "https://archives.bulbagarden.net/media/upload/thumb/a/a1/Substitute_artwork.png/250px-Substitute_artwork.png";

  const imageUrl = error || !mondata
    ? fallbackImageUrl
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mondata.id}.png`;

  const speedStat = mondata
    ? mondata.stats.find((stat) => stat.stat.name === "speed").base_stat
    : 0;

  return (
    <Card className="pokemon-card" style={{ background: cardBackground }}>
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip id="tooltip-svg">
            This pokemon doesn't have many data entries and can't filter outliers yet! May not be reliable
          </Tooltip>
        }
      >
        {pokemon.entry_count < 15 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#BB0000"
            className="pokemon-card-svg"
          >
            <path d="M120-160v-66.67h480V-160H120Zm519.93-286.67q-80.26 0-136.76-56.57-56.5-56.57-56.5-136.83 0-80.26 56.57-136.76 56.57-56.5 136.83-56.5 80.26 0 136.76 56.57 56.5 56.57 56.5 136.83 0 80.26-56.57 136.76-56.57 56.5-136.83 56.5ZM120-493.33V-560h258.67q5.88 18.21 13.44 34.77 7.56 16.56 17.22 31.9H120Zm0 166.66v-66.66h404.67q16.86 8.91 35.93 14.95 19.07 6.05 39.4 8.71v43H120ZM620-600h40v-160h-40v160Zm20 80q8 0 14-6t6-14q0-8-6-14t-14-6q-8 0-14 6t-6 14q0 8 6 14t14 6Z" />
          </svg>
        )}
      </OverlayTrigger>
      <Card.Img variant="top" src={imageUrl} alt={pokemon.pokemon_name} className="pokemon-card-img" />
      <Card.Body className="pokemon-card-body">
        <Card.Title className="pokemon-card-title">
          {pokemon.pokemon_name.charAt(0).toUpperCase() +
            pokemon.pokemon_name.slice(1)}
        </Card.Title>
        <hr />
        <div className="pokemon-card-radar-container">
          <Radar
            data={{
              labels: ["Off", "SSu", "ASa", "Blk", "SuS", "ObS"],
              datasets: [
                {
                  label:
                    pokemon.pokemon_name.charAt(0).toUpperCase() +
                    pokemon.pokemon_name.slice(1),
                  data: [
                    pokemon.stats.off.average,
                    pokemon.stats.ssu.average,
                    pokemon.stats.asa.average,
                    pokemon.stats.blk.average,
                    pokemon.stats.sus.average,
                    pokemon.stats.obs.average,
                  ],
                  backgroundColor: "rgba(34, 202, 236, 0.2)",
                  borderColor: "rgba(34, 202, 236, 1)",
                  borderWidth: 2,
                },
              ],
            }}
            options={options}
          />
        </div>
        <hr />
        {/* Speed Information */}
        <div className="pokemon-card-speed">
          <span>Speed: {speedStat}</span>
          <br />
          <span>{pokemon.stats.speed}</span>
        </div>
        <Link to={`/entry?name=${pokemon.pokemon_name}`}>
          <Button variant="primary" className="pokemon-card-button">
            Contribute your rating!
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;
