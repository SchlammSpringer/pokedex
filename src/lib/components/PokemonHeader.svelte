<script lang="ts">
  import { officialArtworkUrl } from '$lib/share.js'
  import type { Pokemon } from '$lib/types'
  import Image from '$lib/components/Image.svelte'

  export let pokemon: Pokemon
</script>

<Image
  class="w-full lg:aspect-[10/4] aspect-auto"
  alt={`Habitat of ${pokemon.name}`}
  image={{ sourceUrl: `/assets/habitats/${pokemon.habitat}.jpg` }}
  sizes={{ sm: '110px', md: '10rem', lg: '10rem', xl: '10rem' }}
/>
<div
  class="flex h-full sm:h-fit justify-start items-center absolute bottom-0 left-0 right-0 px-4 backdrop-saturate-200 bg-black/30"
>
  <Image
    alt={pokemon.name}
    image={{ sourceUrl: `${officialArtworkUrl + pokemon.pokedex}.png` }}
    width={160}
    height={160}
  />

  <div class="items-center">
    <h1 class="pl-10 pt-10 text-white font-bold first-letter:uppercase">
      {pokemon.name}
    </h1>
    <h2 class="pl-10 pb-10 text-white font-bold">{pokemon.germanName}</h2>
  </div>
</div>

<style>
</style>
