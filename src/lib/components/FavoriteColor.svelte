<script lang="ts">
  
  export let color: string

</script>
<h3>Favorite color</h3>
    {#if color === 'gray'}
      <div class="w-fit rounded-full" style="background-color: gray">
        <span class="font-bold p-4" style="color: white">{color}</span>
      </div>
    {:else}
      <div class="w-fit rounded-lg" style="background-color: {color}">
        <span class="invert font-bold p-4" style="color: {color}">{color}</span>
      </div>
    {/if}

<style>
</style>

