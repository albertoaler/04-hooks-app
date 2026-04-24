import { useEffect, useState } from "react";

interface Pokemon {
  id: number,
  name: string,
  imageUrl: string;
}

interface Props {
  id: number;
}

export const usePokemon = ({ id }: Props) => {

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const getPokemonById = async (id: number) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (response.status != 200) {
      setPokemon(null);
      return;
    }

    const data = await response.json();

    setPokemon({
      id: id,
      name: data.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    });
  };

  // Before react compiler (react 19+) if we added the getPokemonById to the array of
  // dependencies, it would create an memorization problem, with the new compiler
  // react handles the memo
  useEffect(() => {
    getPokemonById(id);
  }, [id]);

  return {
    // properties
    pokemon,

    // computed
    formattedId: id.toString().padStart(3, '0')
  };
};
