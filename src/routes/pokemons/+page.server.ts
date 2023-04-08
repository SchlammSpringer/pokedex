import type { PageServerLoad } from './$types'

import type { Config } from '@sveltejs/adapter-vercel'

export const config: Config = {
  isr: {
    expiration: false,
    allowQuery: ['type']
  }
}

export const load = (async (event) => {
  const response = await event.fetch('/api/pokemons')
  return {
    pokemons: response.json()
  }
}) satisfies PageServerLoad
