import type { Config, RequestHandler } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'
import type { Pokemon } from '$lib/types'
import { fetchPokemon } from '$lib/server/share'

export const config: Config = {
  runtime: 'edge',
  split: true
};

const fetchOriginalPokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  return await response.json()
}

export const GET = (async () => {
  const originalPokemons = await fetchOriginalPokemons()

  const maybePokemons: Promise<Pokemon>[] = originalPokemons.results.map(({ url }: { url: URL }) =>
    fetchPokemon(url)
  )
  const pokemons = await Promise.all(maybePokemons)

  console.log('pokemons collected & transformed ...')

  return json({ pokemons })
}) satisfies RequestHandler
