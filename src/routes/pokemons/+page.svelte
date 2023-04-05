<script lang="ts">
  import type { Pokemons } from '$lib/types'
  import PokemonsGrid from './Pokemons.svelte'

  export let data: Pokemons
</script>

<div>
  <PokemonsGrid initalPokemons={data.pokemons} />
</div>

<style>
</style>
