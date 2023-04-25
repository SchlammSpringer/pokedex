<script lang="ts">
  import { fillFromTypes } from '$lib/share'
  import type { PokeTypeRecord } from '$lib/types'
  import { slide } from 'svelte/transition'

  export let initialSelectedType: string | null
  export let types: string[]
  export let filteredTypes: PokeTypeRecord
  let isOpen = false

  if (initialSelectedType) {
    filteredTypes = fillFromTypes(types, false)
    filteredTypes[initialSelectedType] = true
    isOpen = true
  }
  const toggle = () => isOpen = !isOpen

  const filter = (type: string) => (filteredTypes[type] = !filteredTypes[type])

  let typeFilterActive: boolean

  $: {
    typeFilterActive = Object.values(filteredTypes).includes(false)
  }

</script>

<div class="relative">
  {#if !isOpen}
    {#if !typeFilterActive}
    <button  class="textarea py-2 px-2 input w-full" on:click={toggle}>all types selected - click to open</button>
      {:else}
      <button  class="textarea py-2 px-2 input-warning w-full" on:click={toggle}>type filter is active - click to open</button>
      {/if}
  {/if}

  {#if isOpen}
    <button class="badge-icon variant-filled-warning absolute -top-0 -right-0 z-10" on:click={toggle}>X</button>
    <div class="textarea flex flex-wrap gap-2 px-2 py-4" transition:slide={{ duration: 300 }}>
      {#each Object.keys(filteredTypes) as type}
    <button
      data-testid="typeFilter"
      class="chip {filteredTypes[type] ? 'variant-filled' : 'variant-soft'}"
      on:click={() => {
        filter(type)
      }}
    >
      {#if filteredTypes[type]}<span
        class="border-b-2 border-surface-50 border-r-2 w-1 h-2 inline-block rotate-45"></span>{/if}
      <span class="capitalize">{type}</span>
    </button>
      {/each}
    </div>
  {/if}
</div>

<style>
</style>

