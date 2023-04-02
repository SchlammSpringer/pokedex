<script lang="ts">
  import PokemonSearch from '$lib/components/PokemonSearch.svelte'
  import PokemonCard from '$lib/components/PokemonCard.svelte'
  import { getAllPokemons } from '$lib/queries'
  import type { Pokemons } from '$lib/types'
  import { ProgressBar } from '@skeletonlabs/skeleton'
  import { createQuery } from '@tanstack/svelte-query'

  const query = createQuery<Pokemons>({
    queryKey: ['pokemons'],
    queryFn: () => getAllPokemons(fetch)
  })

  let initalPokemons = $query.data?.pokemons || []

  let pokemons = initalPokemons
</script>

<div class="container mx-auto p-8 space-y-8">
  <h1>Pokemons</h1>
  {#if $query.isLoading}
    <ProgressBar />
  {/if}
  {#if $query.isSuccess}
    <PokemonSearch {initalPokemons} bind:pokemons />
    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {#each pokemons as pokemon}
        <PokemonCard {pokemon} />
      {/each}
    </div>
  {/if}
</div>

<style>
</style>
