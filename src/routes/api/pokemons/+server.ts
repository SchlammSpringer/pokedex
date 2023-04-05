import { insertAllPokemons, selectAllPokemons } from '$lib/server/db-queries'
import { fetchPokemon } from '$lib/server/share'
import type { Pokemon } from '$lib/types'
import type { RequestHandler } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'

const fetchOriginalPokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151', {
    headers: {
      Accept: 'application/json'
    }
  })
  return await response.json()
}

export const GET = (async () => {
  const { data } = await selectAllPokemons()
  if (data && data?.length !== 0) {
    const pokemons: Pokemon[] = data.map((pokemon) => pokemon.pokemon) satisfies Pokemon[]
    return json(pokemons, { headers: { 'Cache-Control': 's-maxage=86400' } })
  }
  const originalPokemons = await fetchOriginalPokemons()
  const maybePokemons: Promise<Pokemon>[] = originalPokemons.results.map(({ url }: { url: URL }) =>
    fetchPokemon(url)
  )
  const pokemons = await Promise.all(maybePokemons)
  for (const pokemon of pokemons) {
    const { data, error } = await insertAllPokemons(pokemon)
  }
  return json(pokemons, { headers: { 'Cache-Control': 's-maxage=86400' } })
}) satisfies RequestHandler
