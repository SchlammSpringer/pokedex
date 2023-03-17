<script lang='ts'>
  import type { PageData } from './$types'
  import type { Pokemons } from '../../types'

  export let data: PageData
  const pokemons: Pokemons = data.pokemons
  const spriteUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
  const spriteBackUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/'

  let sprite: string[] = []
  const frontImage = (pokedex) => {
    const url = `${spriteUrl + pokedex}.png`
    sprite[pokedex] = url
    return url
  }

  const backImage = (pokedex) => {
    const url = `${spriteBackUrl + pokedex}.png`
    sprite[pokedex] = url
    return url
  }
</script>

<div class='container mx-auto p-8 space-y-8'>
  <h1>Pokemons</h1>
  <div class='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
    {#each pokemons as pokemon}
      <div
        class='card overflow-hidden p-4 text-center'
        on:mouseover={() => backImage(pokemon.pokedex)}
        on:focus={() => backImage(pokemon.pokedex)}
        on:mouseout={() => frontImage(pokemon.pokedex)}
        on:blur={() => frontImage(pokemon.pokedex)}
      >
        <a href='/pokemons/{pokemon.name}' class='!no-underline'>
          <header class='card-header'>
            <h2 class='!text-xl first-letter:uppercase'>{pokemon.name}</h2>
          </header>
          <section class='p-4'>
            <img
              class='block bg-pink-50 ml-auto mr-auto rounded-full border border-gray-100 shadow-sm'
              src={sprite[pokemon.pokedex] || frontImage(pokemon.pokedex)}
              alt={pokemon.name}
            />
          </section>
        </a>
      </div>
    {/each}
  </div>
</div>

<style>
</style>
