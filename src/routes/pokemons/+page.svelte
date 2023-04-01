<script lang="ts">
  import PokemonCard from '$lib/components/PokemonCard.svelte'
  import type { Pokemons } from '$lib/types'
  import { page } from '$app/stores'
  import { createQuery } from '@tanstack/svelte-query'
  import { getAllPokemons } from '$lib/queries'
  import { InputChip, ProgressBar } from '@skeletonlabs/skeleton'
  import { goto } from '$app/navigation'

  const url = $page.url

  const query = createQuery<Pokemons>({
    queryKey: ['pokemons'],
    queryFn: () => getAllPokemons(fetch)
  })

  let searchTerm = ''
  let typeSearchTerm = ''

  let typeFilter = url.searchParams.get('type') || ''

  const types = [...new Set($query.data?.pokemons.flatMap((pokemon) => pokemon.types))]

  let typesWhitelist = types

  let selectedTypes = typeFilter.length === 0 ? types : [typeFilter]

  $: pokemons =
    $query.data?.pokemons.filter(
      (pokemon) =>
        (pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pokemon.pokedex.toString().includes(searchTerm.toLowerCase()) === true) &&
        pokemon.types.filter((type) => selectedTypes.includes(type)).length > 0
    ) || []

  const onNext = (event: CustomEvent<any>) => {
    selectedTypes = selectedTypes.length === 0 ? types : selectedTypes
    if (url.searchParams.get('type') === event.detail.chipValue) {
      const newUrl = new URL($page.url)
      newUrl?.searchParams.delete('type')
      goto(newUrl)
    }
  }
</script>

<div class="container mx-auto p-8 space-y-8">
  <h1>Pokemons</h1>
  {#if $query.isLoading}
    <ProgressBar />
  {/if}
  {#if $query.isSuccess}
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
      <div class="input-group-shim"><i class="fa-solid fa-search" /></div>
      <input
        bind:value={searchTerm}
        autocomplete="false"
        type="search"
        placeholder="Search name, pokedex id"
      />
    </div>
    <InputChip
      placeholder="Pokemon type..."
      bind:input={typeSearchTerm}
      bind:value={selectedTypes}
      whitelist={typesWhitelist}
      name="chips"
      on:remove={(event) => onNext(event)}
    />
    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {#each pokemons as pokemon}
        <PokemonCard {pokemon} />
      {/each}
    </div>
  {/if}
</div>

<style>
</style>
