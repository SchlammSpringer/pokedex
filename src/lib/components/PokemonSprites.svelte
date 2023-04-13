<script lang="ts">
  import { spriteBackUrl, spriteShinyBackUrl, spriteShinyUrl, spriteUrl } from '$lib/share.js'
  import type { Pokemon } from '$lib/types'
  import ImageSprite from './ImageSprite.svelte'

  export let pokemon: Pokemon
</script>

<h3>Sprites</h3>

<div class="flex space-x-2 justify-between">
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <ImageSprite
      alt={`${pokemon.name} classic sprite front view`}
      title={pokemon.name}
      image={{ sourceUrl: `${spriteUrl + pokemon.pokedex}.png` }}
      width={124}
      height={124}
    />
  </span>
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <ImageSprite
      alt={`${pokemon.name} classic sprite back view`}
      title={pokemon.name}
      image={{ sourceUrl: `${spriteBackUrl + pokemon.pokedex}.png` }}
      width={124}
      height={124}
    />
  </span>
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <ImageSprite
      alt={`${pokemon.name} shiny sprite front view`}
      title={pokemon.name}
      image={{ sourceUrl: `${spriteShinyUrl + pokemon.pokedex}.png` }}
      width={124}
      height={124}
    />
  </span>
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <ImageSprite
      alt={`${pokemon.name} shiny sprite back view`}
      title={pokemon.name}
      image={{ sourceUrl: `${spriteShinyBackUrl + pokemon.pokedex}.png` }}
      width={124}
      height={124}
    />
  </span>
</div>

<style>
</style>
