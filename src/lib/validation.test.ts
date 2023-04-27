import { schema, validatePokemon } from '$lib/validation'
import { ZodFastCheck } from 'zod-fast-check'
import { fc } from '@fast-check/vitest'
import { describe, expect, it, vi, type Mock } from 'vitest'
import { z } from 'zod'
import type { Pokemon } from '$lib/types'
import { error } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'

describe('validate Pokemon', () => {
  const schemaForTesting = z.object({
    pokedex: z.number().positive().int().min(1),
    name: z.string().min(1).max(30),
    types: z.array(z.string().min(1).max(30)).nonempty(),
    description: z.string().min(1).max(3000),
    color: z.string().min(1),
    germanName: z.string().min(1).max(50),
    habitat: z.string().min(1).max(50),
    notes: z.string().min(5).max(1000).optional()
  })
  const schemaForInvalidTesting = z.object({
    pokedex: z.number().optional(),
    name: z.string().min(31).optional(),
    types: z.array(z.string().min(31)),
    description: z.string().min(3001).optional(),
    color: z.string().optional(),
    germanName: z.string().min(51).optional(),
    habitat: z.string().min(51).optional(),
    notes: z.string().min(1001)
  })

  const pokemonArbitrary = ZodFastCheck().inputOf(schemaForTesting)
  it('PBT schema is valid', () => {
    fc.assert(
      fc.property(pokemonArbitrary, (pokemon) => {
        const parsedPokemon = schema.safeParse(pokemon)

        // TODO workaround Arbitrary ignores trim functionality
        if (!parsedPokemon.success && parsedPokemon.error) {
          console.table(parsedPokemon.error.issues)
          expect(
            parsedPokemon.error.issues.length ===
              parsedPokemon.error.issues
                .map((issue) => issue.code)
                .filter((code) => code === 'too_small').length
          ).toBe(true)
        } else {
          expect(parsedPokemon.success).toBe(true)
        }
      })
    )
  })

  const wrongPokemonArbitrary = ZodFastCheck().inputOf(schemaForInvalidTesting)
  it('PBT correct invalid', () => {
    fc.assert(
      fc.property(wrongPokemonArbitrary, (pokemon) => {
        const parsedPokemon = schema.safeParse(pokemon)

        expect(parsedPokemon.success).toBe(false)
      })
    )
  })
  it('empty invalid', () => {
    const pokemon = {
      pokedex: 0.5,
      name: '  ',
      description: '  ',
      types: [],
      color: '  ',
      germanName: '  ',
      habitat: '  ',
      notes: '  '
    }

    const parsedPokemon = schema.safeParse(pokemon)
    let toSmall = []
    let invalidType = []
    if (!parsedPokemon.success) {
      const codes = parsedPokemon.error.issues.map((issue) => issue.code)
      toSmall = codes.filter((code) => code === 'too_small')
      invalidType = codes.filter((code) => code === 'invalid_type')
    }
    expect(parsedPokemon.success).toBe(false)
    expect(toSmall.length).toBe(7)
    expect(invalidType.length).toBe(1)
  })
})
describe('test validation call', () => {
  const convertError = () => (statuscode: number, message: string) =>
    new Error(`${statuscode}: ${message}`)
  vi.mock('sveltekit-superforms/server')
  vi.mock('@sveltejs/kit')
  const pokemon: Pokemon = {
    pokedex: 1,
    name: 'bulbasaur',
    description: 'Dieses Pokémon',
    types: ['grass', 'poison'],
    color: 'green',
    germanName: 'Bisasam',
    habitat: 'grassland'
  }
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('superforms validation is correct', async () => {
    const superValidateMock = superValidate as Mock

    superValidateMock.mockResolvedValueOnce({ valid: true, data: pokemon })
    const result = await validatePokemon(pokemon)

    expect(superValidateMock).toHaveBeenNthCalledWith(1, pokemon, schema)
    expect(result.valid).toBe(true)
  })
  it('superforms validation is incorrect', async () => {
    const superValidateMock = superValidate as Mock
    superValidateMock.mockResolvedValueOnce({ valid: false, errors: 'lalala' })
    const mockedError = error as Mock
    mockedError.mockImplementation(convertError())

    await expect(validatePokemon(pokemon)).rejects.toThrowError('400: validation errors: "lalala"')
  })
})
