import { validatePokemon } from '$lib/server/share'
import { schema, type Pokemon } from '$lib/types'
import { fail, error as svelteError } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import type { Actions, PageServerLoad } from './$types'
import type { Config } from '@sveltejs/adapter-vercel'

export const config: Config = {
  isr: false
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
      console.log('invalid', form.errors)
      throw svelteError(400, 'validation errors: ' + JSON.stringify(form.errors, null, 2))
      // Again, always return { form } and things will just work.
      // TODO don´t render the display component.
      return fail(400, { form })
    }
    await fetch(`/api/pokemons/${params.name}`, {
      method: 'PUT',
      body: JSON.stringify(form.data)
    })
    // Yep, return { form } here too
    return { form }
  }
} satisfies Actions
