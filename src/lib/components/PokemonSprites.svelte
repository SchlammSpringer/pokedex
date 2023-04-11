<script lang="ts">
  import { spriteBackUrl, spriteShinyBackUrl, spriteShinyUrl, spriteUrl } from '$lib/share.js'
  import type { Pokemon } from '$lib/types'
  import Image from '$lib/components/Image.svelte'

  export let pokemon: Pokemon
</script>

<h3>Sprites</h3>

<div class="flex space-x-2 justify-between">
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <Image
      alt={`${pokemon.name} classic sprite front view`}
      image={{ sourceUrl: `${spriteUrl + pokemon.pokedex}.png` }}
      width={124}
      height={124}
    />
  </span>
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <Image
      alt={`${pokemon.name} classic sprite back view`}
      image={{ sourceUrl: `${spriteBackUrl + pokemon.pokedex}.png` }}
      width={124}
      height={124}
    />
  </span>
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <Image
      alt={`${pokemon.name} shiny sprite front view`}
      image={{ sourceUrl: `${spriteShinyUrl + pokemon.pokedex}.png` }}
      width={124}
      height={124}
    />
  </span>
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <Image
      alt={`${pokemon.name} shiny sprite back view`}
      image={{ sourceUrl: `${spriteShinyBackUrl + pokemon.pokedex}.png` }}
      width={124}
      height={124}
    />
  </span>
</div>

<style>
</style>
