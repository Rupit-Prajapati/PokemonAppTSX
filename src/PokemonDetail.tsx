import { CardMedia, Typography } from '@mui/material';
import React from 'react';
interface SinglePokemon {
  sprites: {
    front_default: string;
  };
  name: string;
}

const PokemonDetail: React.FC<{ pokemonData: SinglePokemon | null }> = ({ pokemonData }) => {
  return (
    <>
      <CardMedia component="img" alt={pokemonData?.name} height="auto" image={pokemonData?.sprites.front_default} />
      <Typography>{
      }</Typography>
    </>
  )
}

export default PokemonDetail;