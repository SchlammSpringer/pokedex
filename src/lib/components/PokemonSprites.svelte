<script lang="ts">
  import type { Pokemon } from '$lib/types'
  import spriteImage from '$lib/assets/images/_gen/front'
  import spriteBackImage from '$lib/assets/images/_gen/back'
  import spriteShinyImage from '$lib/assets/images/_gen/shiny'
  import spriteShinyBackImage from '$lib/assets/images/_gen/shinyback'
  import type { ImageSet as ImageSetType } from 'web-image-gen-svelte'
  import ImageSet from 'web-image-gen-svelte'

  export let pokemon: Pokemon

  const spriteSet: ImageSetType = spriteImage[pokemon.pokedex]
  const spriteBackSet: ImageSetType = spriteBackImage[pokemon.pokedex]
  const spriteShinySet: ImageSetType = spriteShinyImage[pokemon.pokedex]
  const spriteShinyBackSet: ImageSetType = spriteShinyBackImage[pokemon.pokedex]
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
