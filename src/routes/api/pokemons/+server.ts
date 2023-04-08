import { insertAllPokemons, selectAllPokemons } from '$lib/server/db-queries'
import { fetchPokemon } from '$lib/server/share'
import type { Pokemon } from '$lib/types'
import type { RequestHandler } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'
import type { Config } from '@sveltejs/adapter-vercel'

export const config: Config = {
  runtime: 'edge'
}

const fetchOriginalPokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151', {
    headers: {
      Accept: 'application/json'
    }
  })
  return await response.json()
}

const fetchFromPokeAPi = async () => {
  const originalPokemons = await fetchOriginalPokemons()
  return originalPokemons.results.map(({ url }: { url: URL }) => fetchPokemon(url))
}

const pokemonsToJson = (pokemons: Pokemon[]) =>
  json(pokemons, {
    headers: { 'Cache-Control': 'max-age=0, s-maxage=86400' }
  })

export const GET = (async () => {
  const { data } = await selectAllPokemons()
  if (data && data?.length !== 0) {
    const pokemons: Pokemon[] = data
      .map(({ pokemon }) => pokemon)
      .filter((it): it is Pokemon => it !== null) satisfies Pokemon[]
    return pokemonsToJson(pokemons)
  }
  const maybePokemons = await fetchFromPokeAPi()
  const pokemons = await Promise.all(maybePokemons)
  for (const pokemon of pokemons) {
    await insertAllPokemons(pokemon)
  }
  return pokemonsToJson(pokemons)
}) satisfies RequestHandler
