import { error as svelteError } from '@sveltejs/kit'
import { z } from 'zod'
import type { Pokemon } from './types'
import { superValidate } from 'sveltekit-superforms/server'

export const schema = z.object({
  pokedex: z.number().positive().int(),
  name: z.string().trim().min(1).max(30),
  types: z.array(z.string().trim().min(1).max(30)).nonempty(),
  description: z.string().trim().min(1).max(3000),
  color: z.string().trim().min(1),
  germanName: z.string().trim().min(1).max(50),
  habitat: z.string().trim().min(1).max(50),
  notes: z.string().trim().min(5).max(1000).optional()
})

export const validatePokemon = async (pokemon: Pokemon) => {
  const form = await superValidate(pokemon, schema)
  if (!form.valid) {
    throw svelteError(400, 'validation errors: ' + JSON.stringify(form.errors, null, 2))
  }
  return form
}
