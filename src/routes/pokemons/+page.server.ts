import type { PageServerLoad } from './$types'

export const config = {
  isr: {
    allowQuery: ['type']
  }
}

export const load = (async (event) => {
  const response = await event.fetch('/api/pokemons', {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })

  return await response.json()
}) satisfies PageServerLoad
