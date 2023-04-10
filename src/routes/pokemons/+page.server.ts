import { BYPASS_TOKEN } from '$env/static/private'
import type { PageServerLoad } from './$types'

import type { Config } from '@sveltejs/adapter-vercel'

export const config: Config = {
  isr: {
    expiration: false,
    bypassToken: BYPASS_TOKEN,
    allowQuery: ['type']
  }
}

export const load = (async (event) => {
  const response = await event.fetch('/api/pokemons')
  return {
    pokemons: response.json()
  }
}) satisfies PageServerLoad
