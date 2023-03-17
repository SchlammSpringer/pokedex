import type { RequestHandler } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'

export const GET = (async ({ params }) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
  const pokemon = await response.json()
  console.log(pokemon)
  return json(pokemon)
}) satisfies RequestHandler
