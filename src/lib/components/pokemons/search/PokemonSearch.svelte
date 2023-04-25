<script lang="ts">
  import SearchInput from './SearchInput.svelte'

  import TypeSelection from './TypeSelection.svelte'

  import { fillFromTypes, filterPokemon } from '$lib/share'
  import type { PokeTypeRecord, Pokemon } from '$lib/types'
  import { uniq } from 'fp-ts/lib/Array'
  import * as S from 'fp-ts/lib/string'

  export let pokemons: Pokemon[]
  export let initalPokemons: Pokemon[]
  let searchTerm = ''
  export let typeFilterFromQuery: string | null
  const types = uniq(S.Eq)(pokemons.flatMap((pokemon) => pokemon.types))

  let filteredTypes: PokeTypeRecord = fillFromTypes(types, true)

  $: {
    pokemons = initalPokemons.filter(filterPokemon(searchTerm, filteredTypes)) || []
  }
</script>

<div class="space-y-2">
  <TypeSelection initialSelectedType={typeFilterFromQuery} {types} bind:filteredTypes />
  <SearchInput bind:searchTerm />
</div>

<style>
</style>
