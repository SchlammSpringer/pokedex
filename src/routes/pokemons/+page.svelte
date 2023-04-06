<script lang="ts">
  import type { Pokemons } from '$lib/types'
  import PokemonsGrid from '$lib/components/Pokemons.svelte'

  export let data: Pokemons
</script>

<div>
  <PokemonsGrid initalPokemons={data.pokemons} />
</div>

<style>
</style>
