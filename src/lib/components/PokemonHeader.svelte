<script lang="ts">
  import { officialArtworkUrl } from '$lib/share.js'
  import type { Pokemon } from '$lib/types'
  import { Avatar } from '@skeletonlabs/skeleton'
  import { fly } from 'svelte/transition'

  export let pokemon: Pokemon
</script>

<img
  src="https://source.unsplash.com/random/1000x400?${pokemon.habitat}&nature"
  in:fly
  class="w-full aspect-[10/4]"
  alt={pokemon.habitat}
/>
<div
  class="flex justify-start items-center absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-80"
>
  <Avatar
    width="w-40"
    background="opacity-100"
    src="{officialArtworkUrl + pokemon.pokedex}.png"
    alt={pokemon.name}
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
