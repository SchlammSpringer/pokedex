import { BYPASS_TOKEN } from '$env/static/private'
import { validatePokemon } from '$lib/server/share'
import { schema, type Pokemon } from '$lib/types'
import { fail, error as svelteError } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import type { Actions, PageServerLoad } from './$types'

export const load = (async (event) => {
  const response: Response = await event.fetch(`/api/pokemons/${event.params.name}`)
  if (response.status !== 200) {
    throw svelteError(response.status, `${event.params.name} not found`)
  }
  const pokemon: Pokemon = (await response.json()) satisfies Pokemon
  const form = await validatePokemon(pokemon)
  return { form }
}) satisfies PageServerLoad

export const actions = {
  default: async (event) => {
    const form = await superValidate(event.request, schema)

    // Convenient validation check:
    if (!form.valid) {
      console.log('invalid', form.errors)
      throw svelteError(400, 'validation errors: ' + JSON.stringify(form.errors, null, 2))
      // Again, always return { form } and things will just work.
      // TODO don´t render the display component.
      return fail(400, { form })
    }

    // TODO: Do something with the validated data
    await event.fetch('/pokemons/' + event.params.name, {
      headers: { 'x-prerender-revalidate': BYPASS_TOKEN },
      method: 'HEAD'
    })

    await event.fetch('/api/pokemons/' + event.params.name, {
      method: 'PUT',
      body: JSON.stringify(form.data)
    })
    // Yep, return { form } here too
    return { form }
  }
} satisfies Actions
