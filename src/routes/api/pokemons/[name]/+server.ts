import { findPokemonByName, updatePokemon } from '$lib/server/db-queries'
import { validatePokemon } from '$lib/server/share'
import type { Pokemon } from '$lib/types'
import type { RequestHandler } from '@sveltejs/kit'
import { error, error as svelteError, json } from '@sveltejs/kit'

export const GET = (async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { data } = await findPokemonByName(params.name!)
  if (!data || data?.length === 0) throw error(404, 'not found')

  return json(data[0].pokemon, {
    headers: { 'Cache-Control': 's-maxage=1, stale-while-revalidate' }
  })
}) satisfies RequestHandler

export const PUT = (async ({ request }) => {
  const body: Pokemon = (await request.json()) as Pokemon
  const form = await validatePokemon(body)
  const { data } = await updatePokemon(body)
  if (!data) throw svelteError(400, `validation errors: ${JSON.stringify(form.errors, null, 2)}`)

  return json(data[0].pokemon, {
    headers: { 'Cache-Control': 's-maxage=1, stale-while-revalidate' }
  })
}) satisfies RequestHandler
