import type { Pokemon } from '$lib/types'
import { schema, validatePokemon } from '$lib/validation'
import type { Config } from '@sveltejs/adapter-vercel'
import { fail, error as svelteError } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import type { Actions, PageServerLoad } from './$types'

export const config: Config = {
  runtime: 'edge',
  regions: ['fra1']
}

export const load = (async ({ fetch, params }) => {
  const response: Response = await fetch(`/api/pokemons/${params.name}`)
  if (response.status !== 200) {
    throw svelteError(response.status, `${params.name} not found`)
  }
  const pokemon: Pokemon = (await response.json()) satisfies Pokemon
  const form = await validatePokemon(pokemon)
  return { form }
}) satisfies PageServerLoad

export const actions = {
  default: async ({ fetch, request, params }) => {
    const form = await superValidate(request, schema)
    // Convenient validation check:
    if (!form.valid) {
      return fail(400, { form })
    }
    const put = await fetch(`/api/pokemons/${params.name}`, {
      method: 'PUT',
      body: JSON.stringify(form.data)
    })
    if (!put.ok) {
      form.errors.notes = ['Pokemon could not be saved because of database errors']
      return fail(400, { form, incorrect: true })
    }
    // Yep, return { form } here too
    return { form }
  }
} satisfies Actions
