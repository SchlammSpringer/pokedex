import type { PageServerLoad } from './$types'

export const load = (async (event) => {
  const response: Response = await event.fetch(`/api/pokemons/${event.params.name}`)
  return await response.json()
}) satisfies PageServerLoad
