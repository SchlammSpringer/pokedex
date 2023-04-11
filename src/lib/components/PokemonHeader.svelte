<script lang="ts">
  import { officialArtworkUrl } from '$lib/share.js'
  import type { Pokemon } from '$lib/types'
  import Image from '$lib/components/Image.svelte'
  import ImagePokemon from '$lib/components/ImagePokemon.svelte'

  export let pokemon: Pokemon
</script>

<Image
  class="w-full"
  alt={`Habitat of ${pokemon.name}`}
  width={1000}
  height={400}
  loading="eager"
  image={{ sourceUrl: `/assets/habitats/${pokemon.habitat}.jpg` }}
/>
<div
  class="flex h-full sm:h-fit justify-start items-center absolute bottom-0 left-0 right-0 px-4 backdrop-saturate-200 bg-black/30"
>
  <ImagePokemon
    alt={pokemon.name}
    image={{ sourceUrl: `${officialArtworkUrl + pokemon.pokedex}.png` }}
    width={475}
    height={475}
    class="w-32 sm:w-40 lg:w-48"
  />

  <div class="text-right">
    <h1 class="pt-10 text-white font-bold first-letter:uppercase">
      {pokemon.name}
    </h1>
    <h2 class="pb-10 text-white font-bold">{pokemon.germanName}</h2>
  </div>
</div>

<style>
</style>
