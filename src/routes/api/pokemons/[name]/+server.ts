import { findPokemonByName, updatePokemon } from '$lib/server/db-queries'
import type { Pokemon } from '$lib/types'
import { validatePokemon } from '$lib/validation'
import type { Config, RequestHandler } from '@sveltejs/kit'
import { json, error as svelteError } from '@sveltejs/kit'

export const config: Config = {
  runtime: 'edge',
  split: 'true',
  regions: ['fra1']
}

export const GET = (async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { data } = await findPokemonByName(params.name!)
  if (!data || data?.length === 0) throw svelteError(404, 'not found')

  return json(data[0].pokemon, {
    headers: { 'Cache-Control': 'public, s-maxage=1, stale-while-revalidate' }
  })
}) satisfies RequestHandler

export const PUT = (async ({ request }) => {
  const body: Pokemon = (await request.json()) as Pokemon
  const form = await validatePokemon(body)
  if (!form.valid)
    throw svelteError(400, `validation errors: ${JSON.stringify(form.errors, null, 2)}`)
  const { data, error } = await updatePokemon(body)
  if (error || data.length === 0)
    throw svelteError(400, `can´t save pokemon ${error?.message || ''}`)

  return json(data[0].pokemon, {
    headers: { 'Cache-Control': 'public, s-maxage=1, stale-while-revalidate' }
  })
}) satisfies RequestHandler
