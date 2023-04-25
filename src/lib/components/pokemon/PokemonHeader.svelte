<script lang="ts">
  import type { Pokemon } from '$lib/types'
  import classicImage from '$lib/assets/images/_gen/official-artwork'
  import habitatImage from '$lib/assets/images/_gen/habitats'
  import type { ImageSet as ImageSetType } from 'web-image-gen-svelte'
  import ImageSet from 'web-image-gen-svelte'

  export let pokemon: Pokemon

  const classicSet: ImageSetType = classicImage[pokemon.pokedex]
  const habitatSet: ImageSetType = habitatImage[pokemon.habitat]
</script>

<header class="relative">
  <ImageSet alt={`Habitat of ${pokemon.name}`} set={habitatSet} imgClass="w-full h-full" />
  <div
    class="flex h-full sm:h-fit justify-start items-center absolute bottom-0 left-0 right-0 px-4 backdrop-saturate-200 bg-black/30"
  >
    <ImageSet
      imgClass="w-32 sm:w-40 lg:w-48 h-full"
      pictureClass="w-32 sm:w-40 lg:w-48"
      alt={`official artwork of ${pokemon.name}`}
      set={classicSet}
    />
    <div class="text-right">
      <h1 class="pt-10 text-white font-bold first-letter:uppercase">
        {pokemon.name}
      </h1>
      <h2 class="pb-10 text-white font-bold">{pokemon.germanName}</h2>
    </div>
  </div>
</header>

<style>
</style>
