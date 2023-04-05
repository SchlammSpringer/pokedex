import type { RequestHandler } from '@sveltejs/kit'
import { error, json } from '@sveltejs/kit'
import { supabase } from '$lib/server/supabase'

export const GET = (async ({ params }) => {
  const { data } = await supabase
    .from('Pokemons')
    .select('pokemon')
    .eq('pokemon->>name', params.name)
  console.log(data)

  if (!data || data?.length === 0) throw error(404, 'not found')
  return json(data[0].pokemon, { headers: { 'Cache-Control': 's-maxage=86400' } })
}) satisfies RequestHandler
