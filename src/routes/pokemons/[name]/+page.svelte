<script lang="ts">
  import { officialArtworkUrl, spriteBackUrl, spriteShinyBackUrl, spriteShinyUrl, spriteUrl } from '$lib/share.js'
  import type { Pokemon } from '$lib/types'
  import { Avatar } from '@skeletonlabs/skeleton'
  import { fly } from 'svelte/transition'

  export let data: Pokemon

  let pokemon = data
</script>

<div class="container mx-auto p-8 space-y-8">
  <div class="card overflow-hidden">
    <header class="relative">
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
    </header>
    <section class="p-4 space-y-4">
      <h3>Sprites</h3>
      <div class="flex space-x-2 justify-between">
        <Avatar
          width="w-32"
          border="border-4 border-surface-300-600-token hover:!border-primary-500"
          src="{spriteUrl + pokemon.pokedex}.png"
          alt={`${pokemon.name} front view`}
        />
        <Avatar
          width="w-32"
          border="border-4 border-surface-300-600-token hover:!border-primary-500"
          src="{spriteShinyUrl + pokemon.pokedex}.png"
          alt={`${pokemon.name} front view`}
        />
        <Avatar
          width="w-32"
          border="border-4 border-surface-300-600-token hover:!border-primary-500"
          src="{spriteBackUrl + pokemon.pokedex}.png"
          alt={`${pokemon.name} back view`}
        />
        <Avatar
          width="w-32"
          border="border-4 border-surface-300-600-token hover:!border-primary-500"
          src="{spriteShinyBackUrl + pokemon.pokedex}.png"
          alt={`${pokemon.name} back view`}
        />
      </div>
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
      {#if pokemon.types.length === 1}
        <h3>Type</h3>
      {:else}
        <h3>Types</h3>
      {/if}
      <div class="flex justify-start items-center space-x-4">
        {#each pokemon.types as type}
          <a class="chip variant-filled !no-underline" href="/pokemons?type={type}">
            {type}
          </a>
        {/each}
      </div>
    </section>
  </div>
</div>

<style>
</style>
