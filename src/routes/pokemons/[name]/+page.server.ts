import type { PageServerLoad } from './$types'

export const prerender = false

export const load = (async (event) => {
  const response: Response = await event.fetch(`/api/pokemons/${event.params.name}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })

  return await response.json()
}) satisfies PageServerLoad
