<script lang='ts'>
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div class='container mx-auto p-8 space-y-8'>
  <h1 class='first-letter:uppercase'>{data.name}</h1>
  <section>
    {#each data.types as type}
      <span class='chip variant-soft hover:variant-filled'>
        {type.type.name}
      </span>
    {/each}
    <p>{data.description}</p>
  </section>
</div>
