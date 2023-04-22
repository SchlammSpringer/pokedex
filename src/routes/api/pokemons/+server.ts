import { insertPokemon, selectAllPokemons } from '$lib/server/db-queries'
import { fetchPokemon, getAllPokemons } from '$lib/server/share'
import type { Pokemon } from '$lib/types'
import type { Config } from '@sveltejs/adapter-vercel'
import type { RequestHandler } from '@sveltejs/kit'
import { json, error as svelteError } from '@sveltejs/kit'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'

export const config: Config = {
  runtime: 'edge',
  regions: ['fra1']
}

const fetchFromPokeAPi: () => Promise<Promise<Pokemon>[]> = async () => {
  try {
    const allPokemonsInEither = await getAllPokemons()

    return pipe(
      allPokemonsInEither,
      E.match(
        (error) => {
          console.error(error)
          throw svelteError(400, `fetch from poke api: ${JSON.stringify(error, null, 2)}`)
        },
        (result) => result.results.map(({ url }) => fetchPokemon(url))
      )
    )
  } catch (error) {
    console.error(error)
    throw svelteError(400, `fetch from poke api: ${JSON.stringify(error, null, 2)}`)
  }
}

const pokemonsToJson = (pokemons: Pokemon[]) =>
  json(pokemons, {
    headers: { 'Cache-Control': 'public, max-age=0, s-maxage=86400' }
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
  const pokemons: Pokemon[] = await Promise.all(maybePokemons)
  for (const pokemon of pokemons) {
    await insertPokemon(pokemon)
  }
  return pokemonsToJson(pokemons)
}) satisfies RequestHandler
