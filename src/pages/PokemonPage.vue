<template>
  <div v-if="!pokemon">
    <h1>Loading...</h1>
  </div>
  <div v-else>
    <h1>Who's that Pokémon?</h1>
    <hr />
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemonArray" />
  </div>
</template>

<script>
import PokemonOptions from "@/components/PokemonOptions";
import PokemonPicture from "@/components/PokemonPicture";
import getPokemonOptions from "@/helpers/getPokemonOptions";

export default {
  components: {
    PokemonOptions,
    PokemonPicture,
  },
  data() {
    return {
      pokemonArray: [],
      pokemon: null,
      showPokemon: false,
    }
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArray = await getPokemonOptions();

      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArray[rndInt];
    }
  },
  mounted() {
    this.mixPokemonArray();
  }
};
</script>

<style></style>
