<script lang="ts">
  import PokemonTypes from '$lib/components/PokemonTypes.svelte'
  import PokemonHeader from '$lib/components/PokemonHeader.svelte'
  import PokemonSprites from '$lib/components/PokemonSprites.svelte'
  import type { Pokemon } from '$lib/types'

  export let data: Pokemon
  const pokemon = data
</script>

<div class="container mx-auto p-8 space-y-8">
  <div class="card overflow-hidden">
    <header class="relative">
      <PokemonHeader {pokemon} />
    </header>
    <section class="p-4 space-y-4">
      <PokemonSprites {pokemon} />
      <h3>Description</h3>
      <p class="whitespace-pre-line">{pokemon.description}</p>
      <hr class="opacity-50" />
      <h3>Habitat</h3>
      {pokemon.habitat}
      <hr class="opacity-50" />
      <h3>Favorite color</h3>
      <div class="w-fit rounded-lg" style="background-color: {pokemon.color}">
        <span class="invert font-bold p-4" style="color: {pokemon.color}">{pokemon.color}</span>
      </div>
      <hr class="opacity-50" />
      <PokemonTypes {pokemon} />
    </section>
  </div>
</div>

<style>
</style>
