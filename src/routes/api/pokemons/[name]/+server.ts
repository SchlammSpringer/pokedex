import { BYPASS_TOKEN } from '$env/static/private'
import { findPokemonByName, updatePokemon } from '$lib/server/db-queries'
import { validatePokemon } from '$lib/server/share'
import { type Pokemon } from '$lib/types'
import type { RequestEvent, RequestHandler } from '@sveltejs/kit'
import { error, json, error as svelteError } from '@sveltejs/kit'

export const GET = (async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { data } = await findPokemonByName(params.name!)
  if (!data || data?.length === 0) throw error(404, 'not found')
  return json(data[0].pokemon)
}) satisfies RequestHandler

export const PUT = async (event: RequestEvent) => {
  const body: Pokemon = (await event.request.json()) as Pokemon

  await validatePokemon(body)

  const { data } = await updatePokemon(body)
  if (data) {
    await event.fetch('/api/pokemons/' + event.params.name, {
      headers: { 'x-prerender-revalidate': BYPASS_TOKEN },
      method: 'HEAD'
    })
    return json(data[0].pokemon)
  } else {
    throw svelteError(400, 'validation errors: ' + JSON.stringify(form.errors, null, 2))
  }
}
