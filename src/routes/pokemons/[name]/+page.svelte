<script lang="ts">
  import type { Pokemon } from '$lib/types'
  import { spriteBackUrl, spriteShinyBackUrl, spriteShinyUrl, spriteUrl } from '$lib/share.js'
  import { Avatar, ProgressBar } from '@skeletonlabs/skeleton'
  import { fly } from 'svelte/transition'

  export let data: Pokemon
  const src = `https://source.unsplash.com/random/1000x400?${data.habitat}&nature`
  const preload = (src: string) =>
    new Promise((resolve) => {
      const img = new Image()
      img.onload = resolve
      img.src = src
    })
</script>

<div class="container mx-auto p-8 space-y-8">
  <div class="card overflow-hidden">
    <header class="relative">
      {#await preload(src)}
        <div class="w-full aspect-[10/4] h-[400px]">
          <ProgressBar />
        </div>
      {:then _}
        <img {src} in:fly class="w-full aspect-[10/4]" alt={data.habitat} />
      {/await}
      <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
        <h1 class="pl-10 pt-10 text-white font-bold first-letter:uppercase">{data.name}</h1>
        <h2 class="pl-10 pb-10 text-white font-bold">{data.germanName}</h2>
      </div>
    </header>
    <section class="p-4 space-y-4">
      <h3>Sprites</h3>
      <div class="flex space-x-2 justify-between">
        <Avatar
          width="w-32"
          border="border-4 border-surface-300-600-token hover:!border-primary-500"
          src="{spriteUrl + data.pokedex}.png"
          alt={data.name}
        />
        <Avatar
          width="w-32"
          border="border-4 border-surface-300-600-token hover:!border-primary-500"
          src="{spriteShinyUrl + data.pokedex}.png"
          alt={data.name}
        />
        <Avatar
          width="w-32"
          border="border-4 border-surface-300-600-token hover:!border-primary-500"
          src="{spriteBackUrl + data.pokedex}.png"
          alt={data.name}
        />
        <Avatar
          width="w-32"
          border="border-4 border-surface-300-600-token hover:!border-primary-500"
          src="{spriteShinyBackUrl + data.pokedex}.png"
          alt={data.name}
        />
      </div>
      <h3>Description</h3>
      <p class="whitespace-pre-line">{data.description}</p>
      <hr class="opacity-50" />
      <h3>Habitat</h3>
      {data.habitat}
      <hr class="opacity-50" />
      <h3>Favorite color</h3>
      <div class="w-fit rounded-lg" style="background-color: {data.color}">
        <span class="invert font-bold p-4" style="color: {data.color}">{data.color}</span>
      </div>
      <hr class="opacity-50" />
      {#if data.types.length === 1}
        <h3>Type</h3>
      {:else}
        <h3>Types</h3>
      {/if}
      <div class="flex justify-start items-center space-x-4">
        {#each data.types as type}
          <a
            class="chip variant-soft hover:variant-filled !no-underline"
            href="/pokemons?type={type}"
          >
            {type}
          </a>
        {/each}
      </div>
    </section>
  </div>
</div>

<style>
</style>
