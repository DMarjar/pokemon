<template>
  <div v-if="!pokemon">
    <h1>Loading...</h1>
  </div>

  <div v-else>
    <h1>Who's that Pokémon?</h1>
    <hr />

    <PokemonPicture :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />

    <PokemonOptions :pokemons="pokemonArray" @selection="checkAnswer" />

    <!-- Caso 1: con un div -->
    <div class="fade-in" v-if="showAnswer">
      <h2>{{ message }}</h2>
      <button @click="newGame">New game</button>
    </div>

    <!-- Caso 2: con un template -->
    <!-- <template v-if="showAnswer">
      <h2>{{ message }}</h2>
      <button @click="newGame">New game</button>
    </template> -->
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
      showAnswer: false,
      message: "",
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArray = await getPokemonOptions();

      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArray[rndInt];
    },
    checkAnswer(selectedId) {
      this.showPokemon = true;
      this.showAnswer = true;
      if (selectedId === this.pokemon.id) {
        this.message = `Correct! It is ${this.capitalize(this.pokemon.name)}`;
      } else {
        this.message = `Wrong! It was ${this.capitalize(this.pokemon.name)}`;
      }
    },
    capitalize(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    newGame() {
      this.showPokemon = false;
      this.showAnswer = false;
      this.pokemonArray = [];
      this.pokemon = null;
      this.mixPokemonArray();
    },
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>

<style></style>
