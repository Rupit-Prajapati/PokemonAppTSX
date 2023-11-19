import React, { useState, useEffect } from 'react';
import './App.css';
import { Stack } from '@mui/material';
import PokemonListing from './PokemonListing';
import PokemonDetail from './PokemonDetail';
import axios from 'axios';

interface Result {
  name: string;
  url: string;
}

interface Pokemon {
  next: string | null;
  previous: string | null;
  results: Result[];
}
interface SinglePokemon {
  sprites: {
    front_default: string;
  };
  name: string;
  url: string;
}
const App: React.FC = () => {
  const [pokemons, setPokemon] = useState<any | null>(null);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [singlePokemon, SetSinglePokemon] = useState<SinglePokemon | null>(null)
  const [nextUrl, SetNextUrl] = useState<string | null>(null);
  const [prevUrl, SetPrevUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPokemonData();
  }, [url]);

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get<Pokemon>(url);
      SetNextUrl(response.data.next)
      SetPrevUrl(response.data.previous)
      fetchData(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  };

  const fetchData = async (res: Result[]) => {
    const promises = res.map(async (item: Result) => {
      const result = await axios.get<Result>(item.url);
      return result.data;
    });

    const pokemonData = await Promise.all(promises);

    setPokemon((prevPokemon: any) => ({
      ...prevPokemon!,
      results: pokemonData,
    }));
  };

  return (
    <>
      <Stack width={'80%'} margin={'20px auto'} flexDirection={'row'} alignItems={'flex-start'}>
        <PokemonListing loading={loading} setLoading={setLoading} setPokemon={setPokemon} pokemon={pokemons} prev={prevUrl} currentUrl={setUrl} next={nextUrl} getSingle={(data) => SetSinglePokemon(data)} />
        <PokemonDetail pokemonData={singlePokemon} />
      </Stack>
    </>
  );
};

export default App;