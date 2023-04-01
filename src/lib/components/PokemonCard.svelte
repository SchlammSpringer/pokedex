<script lang="ts">
  import { officialArtworkUrl, officialShinyArtworkUrl } from '$lib/share'
  import type { Pokemon } from '$lib/types'

  export let pokemon: Pokemon

  let sprite: string[] = []
  const frontImage = (pokedex: number) => {
    const url = `${officialArtworkUrl + pokedex}.png`
    sprite[pokedex] = url
    return url
  }

  const backImage = (pokedex: number) => {
    const url = `${officialShinyArtworkUrl + pokedex}.png`
    sprite[pokedex] = url
    return url
  }
</script>

<div
  class="card overflow-hidden p-4 text-center"
  on:mouseover={() => backImage(pokemon.pokedex)}
  on:focus={() => backImage(pokemon.pokedex)}
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
        src={sprite[pokemon.pokedex] || frontImage(pokemon.pokedex)}
        alt={pokemon.name}
      />
    </section>
  </a>
</div>

<style>
</style>
