<script lang="ts">
  import type { Pokemon } from '$lib/types'

  export let pokemon: Pokemon
</script>

{#if pokemon.types.length === 1}
  <h3>Type</h3>
{:else}
  <h3>Types</h3>
{/if}
<span>Choose a specific type, to show classic Pokemons of type</span>
<div class="flex justify-start items-center space-x-4">
  {#each pokemon.types as type}
    <a class="chip variant-soft hover:variant-filled !no-underline" href={`/pokemons?types=%5B"${type}"%5D`}>
      {type}
    </a>
  {/each}
</div>

<style>
</style>
