import { error as svelteError, fail } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { z } from 'zod'
import { superValidate } from 'sveltekit-superforms/server'
import type { Pokemon } from '$lib/types'

const schema = z.object({
  pokedex: z.number().positive(),
  name: z.string().min(1),
  types: z.array(z.string().min(1)),
  description: z.string().min(1),
  color: z.string().min(1),
  germanName: z.string().min(1),
  habitat: z.string().min(1),
  notes: z.string().optional()
})

export const load = (async (event) => {
  const response: Response = await event.fetch(`/api/pokemons/${event.params.name}`)
  if (response.status !== 200) {
    throw svelteError(response.status, `${event.params.name} not found`)
  }
  const pokemon: Pokemon = (await response.json()) satisfies Pokemon
  const form = await superValidate(pokemon, schema)
  if (!form.valid) {
    throw svelteError(400, 'validation errors: ' + JSON.stringify(form.errors, null, 2))
  }
  return { form }
}) satisfies PageServerLoad

export const actions = {
  default: async (event) => {

    const form = await superValidate(event.request, schema)
    console.log('POST', form)

    // Convenient validation check:
    if (!form.valid) {
      console.log('invalid', form.errors)
      throw svelteError(400, 'validation errors: ' + JSON.stringify(form.errors, null, 2))
    }

    // TODO: Do something with the validated data

    // Yep, return { form } here too
    return { form }
  }
} satisfies Actions
