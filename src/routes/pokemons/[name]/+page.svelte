<script lang="ts">
  import type { Pokemon } from '$lib/types'
  import { officialArtworkUrl, spriteBackUrl, spriteShinyBackUrl, spriteShinyUrl, spriteUrl } from '$lib/share.js'
  import { Avatar, ProgressBar } from '@skeletonlabs/skeleton'
  import { fly } from 'svelte/transition'
  import { getPokemon } from '$lib/queries'
  import { createQuery } from '@tanstack/svelte-query'
  import type { PageData } from './$types'

  export let data: PageData

  const query = createQuery<Pokemon>({
    queryKey: ['pokemon', data.name],
    queryFn: () => getPokemon(fetch, data.name)
  })
</script>

{#if $query.isLoading}
  <ProgressBar />
{/if}
{#if $query.isSuccess}
  <div class="container mx-auto p-8 space-y-8">
    <div class="card overflow-hidden">
      <header class="relative">
        <img
          src="https://source.unsplash.com/random/1000x400?${$query.data?.habitat}&nature"
          in:fly
          class="w-full aspect-[10/4]"
          alt={$query.data.habitat}
        />
        <div
          class="flex justify-start items-center absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-80"
        >
          <Avatar
            width="w-40"
            background="opacity-100"
            src="{officialArtworkUrl + $query.data.pokedex}.png"
            alt={$query.data.name}
          />
          <div class="items-center">
            <h1 class="pl-10 pt-10 text-white font-bold first-letter:uppercase">
              {$query.data.name}
            </h1>
            <h2 class="pl-10 pb-10 text-white font-bold">{$query.data.germanName}</h2>
          </div>
        </div>
      </header>
      <section class="p-4 space-y-4">
        <h3>Sprites</h3>
        <div class="flex space-x-2 justify-between">
          <Avatar
            width="w-32"
            border="border-4 border-surface-300-600-token hover:!border-primary-500"
            src="{spriteUrl + $query.data.pokedex}.png"
            alt={$query.data.name}
          />
          <Avatar
            width="w-32"
            border="border-4 border-surface-300-600-token hover:!border-primary-500"
            src="{spriteShinyUrl + $query.data.pokedex}.png"
            alt={$query.data.name}
          />
          <Avatar
            width="w-32"
            border="border-4 border-surface-300-600-token hover:!border-primary-500"
            src="{spriteBackUrl + $query.data.pokedex}.png"
            alt={$query.data.name}
          />
          <Avatar
            width="w-32"
            border="border-4 border-surface-300-600-token hover:!border-primary-500"
            src="{spriteShinyBackUrl + $query.data.pokedex}.png"
            alt={$query.data.name}
          />
        </div>
        <h3>Description</h3>
        <p class="whitespace-pre-line">{$query.data.description}</p>
        <hr class="opacity-50" />
        <h3>Habitat</h3>
        {$query.data.habitat}
        <hr class="opacity-50" />
        <h3>Favorite color</h3>
        <div class="w-fit rounded-lg" style="background-color: {$query.data.color}">
          <span class="invert font-bold p-4" style="color: {$query.data.color}"
          >{$query.data.color}</span
          >
        </div>
        <hr class="opacity-50" />
        {#if $query.data.types.length === 1}
          <h3>Type</h3>
        {:else}
          <h3>Types</h3>
        {/if}
        <div class="flex justify-start items-center space-x-4">
          {#each $query.data.types as type}
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
{/if}

<style>
</style>
