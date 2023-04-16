<script lang="ts">
  import type { Pokemons } from '$lib/types'
  import PokemonsGrid from '$lib/components/Pokemons.svelte'
  import { page } from '$app/stores'

  export let data: Pokemons
  const url = $page.url
</script>

<div>
  <PokemonsGrid initalPokemons={data.pokemons} {url}/>
</div>

<style>
</style>
