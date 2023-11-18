import React from 'react';
import { Button, Card, CardContent, CardMedia, CircularProgress, Stack, Typography } from '@mui/material';

interface Pokemon {
  next: string | null;
  prev: string | null;
  results: {
    sprites: {
      front_default: string;
    };
    name: string;
    url: string;
  }[];
}

interface SinglePokemon {
  sprites: {
    front_default: string;
  };
  name: string;
  url: string;
}

const PokemonListing: React.FC<{
  currentUrl: (url: string) => void;
  setPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
  pokemon: Pokemon | null;
  next: string | null;
  prev: string | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>; loading: boolean;
  getSingle: (data: SinglePokemon | null) => void;
}> = ({ pokemon, getSingle, next, prev, currentUrl, setPokemon, setLoading, loading }) => {
  return (
    <>
      <Stack width={'30%'} flexDirection={'column'} gap={1}>
        <Typography variant={'h5'}>Pokemon Listing</Typography>
        <Button disabled={prev ? false : true}
          onClick={() => {
            setLoading(true)
            setPokemon(null);
            prev && currentUrl(prev);
          }}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            setLoading(true)
            setPokemon(null);
            next && currentUrl(next);
          }}
        >
          Next
        </Button>
        {
          loading ? (<CircularProgress />)
            : (
              <>
                {pokemon?.results.map((pokemon, index) => (
                  <Card
                    key={index}
                    onClick={() => getSingle(pokemon)}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: '10px',
                      borderRadius: '10px',
                      backgroundColor: '#000',
                      color: '#fff',
                      boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
                    }}
                  >
                    <CardMedia component="img" alt={pokemon.name} height="auto" image={pokemon.sprites.front_default} />
                    <CardContent sx={{ p: 0 }}>
                      <Typography variant="h5">{pokemon.name}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}

      </Stack>
    </>
  );
};

export default PokemonListing;