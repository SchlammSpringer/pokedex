<script lang="ts">
  import { browser } from '$app/environment'
  import { fillFromTypes, filterPokemon } from '$lib/share'
  import type { Pokemon, PokeTypeRecord } from '$lib/types'
  import { queryParam, ssp } from 'sveltekit-search-params'
  import type { EncodeAndDecodeOptions } from 'sveltekit-search-params/package/sveltekit-search-params'

  export let pokemons: Pokemon[]
  export let initalPokemons: Pokemon[]
  let searchTerm = ''
  const types = [...new Set(pokemons.flatMap((pokemon) => pokemon.types))]
  const typeFilter = queryParam('types', ssp.array() as EncodeAndDecodeOptions<string[]>, {
    pushHistory: false
  })

  let dictionary: PokeTypeRecord

  dictionary = fillFromTypes(types, false)
  dictionary = fillFromTypes(types, true)

  const filter = (type: string) => {
    if ($typeFilter) {
      const found = $typeFilter.includes(type)
      $typeFilter = found ? $typeFilter.filter((it) => it !== type) : $typeFilter.concat([type])
    }
    dictionary[type] = !dictionary[type]
  }

  $: {
    pokemons = initalPokemons.filter(filterPokemon(searchTerm, dictionary)) || []
  }

  $: if (browser) {
    if ($typeFilter) {
      $typeFilter.forEach((type) => (dictionary[type] = true))
    } else {
      $typeFilter = types
    }
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
