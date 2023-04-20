<script lang="ts">
  import type { Pokemon } from '$lib/types'
  import classicImage from '$lib/assets/images/_gen/official-artwork.json'
  import ImageSet from 'web-image-gen-svelte'
  import type { ImageSet as ImageSetType } from 'web-image-gen-svelte'

  export let pokemon: Pokemon
  const classicSet: ImageSetType = classicImage[pokemon.pokedex]
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
      <ImageSet alt={`official artwork of ${pokemon.name}`} set={classicSet} imgClass="w-full h-full"/>
    </section>
  </a>
</div>

<style>
</style>
