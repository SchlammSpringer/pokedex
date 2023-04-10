<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import type { Pokemon } from '$lib/types'

  const url = $page.url
  export let pokemons: Pokemon[]
  export let initalPokemons: Pokemon[]
  let searchTerm = ''
  let typeFilter = url.searchParams.get('type') || undefined
  const types = [...new Set(pokemons.flatMap((pokemon) => pokemon.types))]
  let dictionary

  function fillFromTypes(activate: boolean) {
    return Object.fromEntries(types.sort().map((type) => [type, activate]))
  }

  if (typeFilter) {
    dictionary = fillFromTypes(false)
    dictionary[typeFilter] = true
  } else {
    dictionary = fillFromTypes(true)
  }

  const filter = (type: string) => {
    const newUrl = new URL($page.url)
    newUrl?.searchParams.delete('type')
    goto(newUrl)
    dictionary[type] = !dictionary[type]
  }

  $: {
    pokemons =
      initalPokemons.filter(
        (pokemon) =>
          (pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pokemon.germanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pokemon.pokedex.toString().includes(searchTerm.toLowerCase()) === true) &&
          pokemon.types.filter((type) => dictionary[type]).length > 0
      ) || []
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
      {#if dictionary[type]}<span>✔</span>{/if}
      <span class="capitalize">{type}</span>
    </span>
  {/each}
</div>

<style>
</style>
