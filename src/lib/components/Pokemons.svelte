<script lang="ts">
  import PokemonCard from '$lib/components/PokemonCard.svelte'
  import PokemonSearch from '$lib/components/PokemonSearch.svelte'
  import type { Pokemon } from '$lib/types'

  export let initalPokemons: Pokemon[]
  export let url: URL
  let pokemons = initalPokemons
</script>

<div class="container mx-auto p-4 space-y-8">
  <h1>Pokemons</h1>
  <PokemonSearch {initalPokemons} typeFilter={url?.searchParams?.get('type')} bind:pokemons />
  <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
    {#each pokemons as pokemon}
      <PokemonCard {pokemon} />
    {/each}
  </div>
</div>

<style>
</style>
