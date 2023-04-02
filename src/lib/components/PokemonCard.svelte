<script lang="ts">
  import { officialArtworkUrl, officialShinyArtworkUrl } from '$lib/share'
  import type { Pokemon } from '$lib/types'

  export let pokemon: Pokemon

  let image: string[] = []
  const frontImage = (pokedex: number) => {
    const url = `${officialArtworkUrl + pokedex}.png`
    image[pokedex] = url
    return url
  }

  const shinyImage = (pokedex: number) => {
    const url = `${officialShinyArtworkUrl + pokedex}.png`
    image[pokedex] = url
    return url
  }
</script>

<div
  class="card overflow-hidden p-4 text-center"
  on:mouseover={() => shinyImage(pokemon.pokedex)}
  on:focus={() => shinyImage(pokemon.pokedex)}
  on:mouseout={() => frontImage(pokemon.pokedex)}
  on:blur={() => frontImage(pokemon.pokedex)}
>
  <a href="/pokemons/{pokemon.name}" class="!no-underline">
    <header class="card-header">
      <h2 class="!text-xl first-letter:uppercase">{pokemon.name}</h2>
    </header>
    <section class="p-4">
      <img
        class="block"
        src={image[pokemon.pokedex] || frontImage(pokemon.pokedex)}
        alt={pokemon.name}
      />
    </section>
  </a>
</div>

<style>
</style>
