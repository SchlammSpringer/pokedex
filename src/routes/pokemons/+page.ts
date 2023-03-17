import type { PageLoad } from '../../../.svelte-kit/types/src/routes/pokemons/$types'

export const load = (async (event) => {
  const response = await event.fetch('/api/pokemons', {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })

  return await response.json()
}) satisfies PageLoad
