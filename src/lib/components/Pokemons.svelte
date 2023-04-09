<script lang="ts">
  import PokemonCard from '$lib/components/PokemonCard.svelte'
  import PokemonSearch from '$lib/components/PokemonSearch.svelte'
  import type { Pokemon } from '$lib/types'

  export let initalPokemons: Pokemon[]
  let pokemons = initalPokemons
</script>

<div class="container mx-auto p-4 space-y-8">
  <h1>Pokemons</h1>
  <PokemonSearch {initalPokemons} bind:pokemons />
  <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
    {#each pokemons as pokemon}
      <PokemonCard {pokemon} />
    {/each}
  </div>
</div>

<style>
</style>

