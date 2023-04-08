import { findPokemonByName } from '$lib/server/db-queries'
import type { RequestHandler } from '@sveltejs/kit'
import { error, json } from '@sveltejs/kit'
import { BYPASS_TOKEN } from '$env/static/private'

export const GET = (async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { data } = await findPokemonByName(params.name!)
  if (!data || data?.length === 0) throw error(404, 'not found')
  return json(data[0].pokemon, { headers: { 'Cache-Control': 's-maxage=86400' } })
}) satisfies RequestHandler