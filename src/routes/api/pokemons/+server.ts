import type { RequestHandler } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'
import type { Pokemon, Pokemons } from '$lib/types'
import { fetchPokemon } from '$lib/share'

const fetchOriginalPokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  return await response.json()
}

export const GET = (async () => {
  const originalPokemons = await fetchOriginalPokemons()

  const maybePokemons: Promise<Pokemon>[] = originalPokemons.results.map((it: { url: URL }) =>
    fetchPokemon(it.url)
  )
  const pokemons = await Promise.all(maybePokemons)

  return json(<Pokemons>{ pokemons: pokemons })
}) satisfies RequestHandler
