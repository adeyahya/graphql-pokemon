import pokemons from "../pokemons/pokemons.json";

function determineOffset(after, offset) {
  if (after) {
    for (let i = 0; i < pokemons.length; i++) {
      const pokemon = pokemons[i];
      if (after === pokemon.name) {
        return i + 1;
      }
    }

    return -1;
  }

  return offset || 0;
}

export async function getPokemons(args) {
  const offset = determineOffset(args.after, args.offset);
  let cursorPosition = args.first + offset;
  cursorPosition =
    pokemons.length > cursorPosition
      ? cursorPosition
      : pokemons.length - cursorPosition < 0
      ? pokemons.length - (pokemons.length - cursorPosition)
      : cursorPosition;

  const searchedPokemons = pokemons.slice(offset, cursorPosition);

  return {
    items: searchedPokemons,
    first: args.first,
    nextOffset: cursorPosition >= pokemons.length ? null : cursorPosition,
    offset,
  };
}

export async function getPokemonById(pokemonId) {
  const pokemon = pokemons.filter(
    ({ id }) => parseInt(id, 10) === parseInt(pokemonId, 10)
  );

  return pokemon[0] || null;
}

export async function getPokemonByName(pokemonNameSearch) {
  const pokemonName = pokemonNameSearch.toLowerCase().trim();

  const pokemon = pokemons.filter(
    ({ name }) => name.toLowerCase() === pokemonName
  );

  if (pokemon) {
    return pokemon[0];
  }

  return pokemon[0] || null;
}

export async function getPokemonByEvolutions(evolutions) {
  if (!evolutions) {
    return null;
  }

  const pokemonNames = evolutions.map((evolution) =>
    evolution.name.toLowerCase().trim()
  );

  const searchedPokemons = pokemons.filter(
    ({ name }) => pokemonNames.indexOf(name.toLowerCase()) !== -1
  );

  return searchedPokemons || null;
}
