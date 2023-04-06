import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async (event) => {
  const response: Response = await event.fetch(`/api/pokemons/${event.params.name}`)
  if (response.status === 200) return await response.json()
  throw error(response.status, `${event.params.name} not found`)
}) satisfies PageServerLoad
