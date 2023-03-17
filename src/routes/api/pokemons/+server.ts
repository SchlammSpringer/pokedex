import type { RequestHandler } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'
import type { Pokemons, PokemonShort } from '../../../types'

const lastPart = (href: string) => {
  const segments = new URL(href).pathname.split('/')
  return segments.pop() || segments.pop()
}

const toPokemonShort = () => (pokemon: { url: string; name: string }) => ({
  pokedex: lastPart(pokemon.url),
  name: pokemon.name
})

const fetchOriginalPokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  return await response.json()
}

export const GET = (async () => {
  const originalPokemons = await fetchOriginalPokemons()
  const pokemonShorts: PokemonShort[] = originalPokemons.results.map(toPokemonShort())
  return json(<Pokemons>{ pokemons: pokemonShorts })
}) satisfies RequestHandler
