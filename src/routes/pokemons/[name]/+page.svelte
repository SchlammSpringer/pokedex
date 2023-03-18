<script lang='ts'>
  import type { Pokemon } from '../../../types'

  export let data: Pokemon
</script>

<div class='container mx-auto p-8 space-y-8'>
  <h1 class='first-letter:uppercase'>{data.name}</h1>
  <h2>{data.germanName}</h2>
  <section>
    {#each data.types as type}
      <span class='chip variant-soft hover:variant-filled'>
        {type.type.name}
      </span>
    {/each}
    <p class='whitespace-pre-line'>{data.description}</p>
  </section>
</div>

<style>
</style>
