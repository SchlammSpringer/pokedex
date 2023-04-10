<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { fillFromTypes, filterPokemon } from '$lib/share'
  import type { Pokemon, PokeTypeRecord } from '$lib/types'

  const url = $page.url
  export let pokemons: Pokemon[]
  export let initalPokemons: Pokemon[]
  let searchTerm = ''
  let typeFilter = url.searchParams.get('type') || undefined
  const types = [...new Set(pokemons.flatMap((pokemon) => pokemon.types))]

  let dictionary: PokeTypeRecord

  if (typeFilter) {
    dictionary = fillFromTypes(types, false)
    dictionary[typeFilter] = true
  } else {
    dictionary = fillFromTypes(types, true)
  }

  const filter = (type: string) => {
    const newUrl = new URL($page.url)
    newUrl?.searchParams.delete('type')
    goto(newUrl)
    dictionary[type] = !dictionary[type]
  }

  $: {
    pokemons = initalPokemons.filter(filterPokemon(searchTerm, dictionary)) || []
  }
</script>

<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
  <div class="input-group-shim">🔍</div>
  <input
    bind:value={searchTerm}
    autocomplete="false"
    type="search"
    placeholder="Search name, german name or pokedex id"
  />
</div>

<div class="textarea flex flex-wrap gap-2 px-2 py-4">
  {#each Object.keys(dictionary) as type}
    <span
      class="chip {dictionary[type] ? 'variant-filled' : 'variant-soft'}"
      on:click={() => {
        filter(type)
      }}
      on:keypress
    >
      {#if dictionary[type]}<span
        class="border-b-2 border-surface-50 border-r-2 w-1 h-2 inline-block rotate-45"
      />{/if}
      <span class="capitalize">{type}</span>
    </span>
  {/each}
</div>

<style>
</style>
