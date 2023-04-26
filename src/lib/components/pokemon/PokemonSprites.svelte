<script lang="ts">
  import { getBackImage, getFrontImage, getShinyBackImage, getShinyImage } from '$lib/share'
  import type { Pokemon } from '$lib/types'
  import ImageSet from 'web-image-gen-svelte'

  export let pokemon: Pokemon

  const spriteSet = getFrontImage(pokemon.pokedex.toString())
  const spriteBackSet = getBackImage(pokemon.pokedex.toString())
  const spriteShinySet = getShinyImage(pokemon.pokedex.toString())
  const spriteShinyBackSet = getShinyBackImage(pokemon.pokedex.toString())
</script>

<h3>Sprites</h3>

<div class="flex space-x-2 justify-between">
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <ImageSet
      alt={`${pokemon.name} classic sprite front view`}
      set={spriteSet}
      imgClass="h-[65px] w-[65px] sm:h-[96px] sm:w-[96px]"
    />
  </span>
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <ImageSet
      alt={`${pokemon.name} classic sprite back view`}
      set={spriteBackSet}
      imgClass="h-[65px] w-[65px] sm:h-[96px] sm:w-[96px]"
    />
  </span>
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <ImageSet
      alt={`${pokemon.name} shiny sprite front view`}
      set={spriteShinySet}
      imgClass="h-[65px] w-[65px] sm:h-[96px] sm:w-[96px]"
    />
  </span>
  <span class="rounded-full bg-primary-50 border-primary-500 border-solid border-2">
    <ImageSet
      alt={`${pokemon.name} shiny sprite back view`}
      set={spriteShinyBackSet}
      imgClass="h-[65px] w-[65px] sm:h-[96px] sm:w-[96px]"
    />
  </span>
</div>

<style>
</style>
