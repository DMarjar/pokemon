import pokemonApi from "@/api/pokemonApi";

// Generar el arreglo con total de pokemons
const getPokemons = () => {
  const pokemonsArray = Array.from(Array(649));
  return pokemonsArray.map((_, index) => index + 1);
};

// Funcion para retornar los pokemons de forma aleatoria
const getPokemonOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);
  const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4));
  return pokemons;
};

// Funcion para obtener los nombres de los pokemons
const getPokemonNames = async ([a, b, c, d] = []) => {
  const res = await pokemonApi.get(`/1`); // Individually

  const promiseArr = [
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`),
  ];

  const [p1, p2, p3, p4] = await Promise.all(promiseArr);

  return [
    {
      name: p1.data.name,
      id: p1.data.id,
    },
    {
      name: p2.data.name,
      id: p2.data.id,
    },
    {
      name: p3.data.name,
      id: p3.data.id,
    },
    {
      name: p4.data.name,
      id: p4.data.id,
    },
  ];
};

export default getPokemonOptions;
