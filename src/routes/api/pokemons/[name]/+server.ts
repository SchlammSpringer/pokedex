import type { RequestHandler } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'
import { fetchPokemon } from '$lib/share'

export const GET = (async ({ params }) => {
  const pokeUrl = new URL(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
  const pokemon = await fetchPokemon(pokeUrl)
  console.log(`pokemon ${params.name} fetched`, pokemon)

  return json(pokemon)
}) satisfies RequestHandler
