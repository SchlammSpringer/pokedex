import type { PageLoad } from '../../../../.svelte-kit/types/src/routes/pokemons/[name]/$types'

export const load = (async (event) => {
  const response: Response = await event.fetch(`/api/pokemons/${event.params.name}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })
  return await response.json()
}) satisfies PageLoad
