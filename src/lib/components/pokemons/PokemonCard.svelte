<script lang="ts">
  import type { Pokemon } from '$lib/types'
  import ImageSet from 'web-image-gen-svelte'
  import 'lazysizes/plugins/attrchange/ls.attrchange'
  import { getClassicSet } from '$lib/share'

  export let pokemon: Pokemon

  const classicSet = getClassicSet(pokemon.pokedex.toString())
</script>

<div class="card overflow-hidden p-4 text-center">
  <a
    href="/pokemons/{pokemon.name}"
    data-sveltekit-preload-code="viewport"
    class="!no-underline"
    aria-label="show details for {pokemon.name}"
  >
    <header class="card-header">
      <h2 class="!text-xl first-letter:uppercase">{pokemon.name}</h2>
    </header>
    <section class="p-4">
      <ImageSet
        alt={`official artwork of ${pokemon.name}`}
        set={classicSet}
        imgClass="w-full h-full"
      />
    </section>
  </a>
</div>

<style>
</style>
