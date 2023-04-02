<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import type { Pokemon } from '$lib/types'
  import { InputChip } from '@skeletonlabs/skeleton'

  const url = $page.url

  export let pokemons: Pokemon[]

  export let initalPokemons: Pokemon[]

  let searchTerm = ''
  let typeSearchTerm = ''

  let typeFilter = url.searchParams.get('type') || ''

  const types = [...new Set(pokemons.flatMap((pokemon) => pokemon.types))]

  let typesWhitelist = types

  let selectedTypes = typeFilter.length === 0 ? types : [typeFilter]


  $: {
    pokemons =
      initalPokemons.filter(
        (pokemon) =>
          (pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pokemon.pokedex.toString().includes(searchTerm.toLowerCase()) === true) &&
          pokemon.types.filter((type) => selectedTypes.includes(type)).length > 0
      ) || []
  }

  const onTypeRemoved = (event: CustomEvent) => {
    selectedTypes = selectedTypes.length === 0 ? types : selectedTypes
    if (url.searchParams.get('type') === event.detail.chipValue) {
      const newUrl = new URL($page.url)
      newUrl?.searchParams.delete('type')
      goto(newUrl)
    }
  }
</script>

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
  on:remove={(event) => onTypeRemoved(event)}
/>

<style>
</style>
