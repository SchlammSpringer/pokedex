<script lang="ts">
  import type { Pokemons } from '$lib/types'
  import PokemonsGrid from './Pokemons.svelte'

  export let data: Pokemons
</script>

<PokemonsGrid initalPokemons={data.pokemons} />

<style>
</style>
