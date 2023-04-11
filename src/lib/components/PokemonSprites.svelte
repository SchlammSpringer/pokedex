<script lang="ts">
  import { spriteBackUrl, spriteShinyBackUrl, spriteShinyUrl, spriteUrl } from '$lib/share.js'
  import type { Pokemon } from '$lib/types'

  export let pokemon: Pokemon
</script>

<h3>Sprites</h3>

<div class="flex space-x-2 justify-between">
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <img
      alt={`${pokemon.name} classic sprite front view`}
      src={`${spriteUrl + pokemon.pokedex}.png`}
      width={124}
      height={124}
    />
  </span>
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <img
      alt={`${pokemon.name} classic sprite back view`}
      src={`${spriteBackUrl + pokemon.pokedex}.png`}
      width={124}
      height={124}
    />
  </span>
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <img
      alt={`${pokemon.name} shiny sprite front view`}
      src={`${spriteShinyUrl + pokemon.pokedex}.png`}
      width={124}
      height={124}
    />
  </span>
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <img
      alt={`${pokemon.name} shiny sprite back view`}
      src={`${spriteShinyBackUrl + pokemon.pokedex}.png`}
      width={124}
      height={124}
    />
  </span>
</div>

<style>
</style>
