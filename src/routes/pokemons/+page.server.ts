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
      Accept: 'application/json',
      'Cache-Control': 's-maxage=86400'
    }
  })

  return await response.json()
}) satisfies PageServerLoad
