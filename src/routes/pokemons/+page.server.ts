import type { PageServerLoad } from './$types'

export const config = {
  isr: {
    allowQuery: ['type']
  }
}

export const load = (async (event) => {
  const response = await event.fetch('/api/pokemons')
  return {
    pokemons: response.json()
  }
}) satisfies PageServerLoad
