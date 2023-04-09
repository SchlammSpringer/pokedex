<script lang="ts">
  import { spriteBackUrl, spriteShinyBackUrl, spriteShinyUrl, spriteUrl } from '$lib/share.js'
  import type { Pokemon } from '$lib/types'

  export let pokemon: Pokemon
</script>

<h3>Sprites</h3>
<div class="flex space-x-2 justify-between">
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <img src="{spriteUrl + pokemon.pokedex}.png" alt="${pokemon.name}" />
  </span>
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <img src="{spriteBackUrl + pokemon.pokedex}.png" alt="${pokemon.name}" />
  </span>
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <img src="{spriteShinyUrl + pokemon.pokedex}.png" alt="${pokemon.name}" />
  </span>
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <img src="{spriteShinyBackUrl + pokemon.pokedex}.png" alt="${pokemon.name}" />
  </span>
</div>

<style>
</style>
