import type { Config, RequestHandler } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'
import { fetchPokemon } from '$lib/server/share'

export const config: Config = {
  runtime: 'edge'
}

export const GET = (async ({ params }) => {
  const pokeUrl = new URL(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
  const pokemon = await fetchPokemon(pokeUrl)
  console.log(`pokemon ${params.name} fetched`, pokemon)

  return json(pokemon)
}) satisfies RequestHandler
