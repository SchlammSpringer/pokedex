import type { Mock } from 'vitest'
import { describe, expect, it, vi } from 'vitest'
import { config, GET, PUT } from './+server'
import { findPokemonByName, updatePokemon } from '$lib/server/db-queries'
import type { RequestEvent } from '@sveltejs/kit'
import { error, json } from '@sveltejs/kit'
import { mock } from 'vitest-mock-extended'
import type { Pokemon } from '$lib/types'
import { validatePokemon } from '$lib/server/share'

const convertError = () => (statuscode: number, message: string) =>
  new Error(`${statuscode}: ${message}`)

interface Response {
  pokemon: Pokemon
  header: Record<string, Record<string, string>>
}

const invalidForm = {
  valid: false,
  errors: { notes: ['String must contain at least 5 character(s)'] },
  data: {}
}
const validForm = {
  valid: true,
  errors: {},
  data: {}
}

const convertResponse = (pokemon: Pokemon, header: Record<string, Record<string, string>>) =>
  ({
    pokemon: pokemon,
    header: header
  } satisfies Response)

vi.mock('@sveltejs/kit')
vi.mock('$lib/server/db-queries')
vi.mock('sveltekit-superforms/server')
vi.mock('$lib/server/share')
const request = mock<RequestEvent>()

const pokemon = {
  pokedex: 1,
  name: 'bulbasaur',
  description: 'Dieses Pokémon',
  types: ['grass', 'poison'],
  color: 'green',
  germanName: 'Bisasam',
  habitat: 'grassland'
}
const header = {
  headers: { 'Cache-Control': 'public, s-maxage=1, stale-while-revalidate' }
}

function promiseOfPokemon(changedPokemon: {
  types: string[]
  germanName: string
  habitat: string
  notes: string
  color: string
  name: string
  pokedex: number
  description: string
}) {
  return new Promise(function (resolve, _) {
    setTimeout(() => resolve(changedPokemon))
  })
}

describe('single Pokemon API', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('check vercel config', () => {
    expect(config).toMatchSnapshot()
  })
  describe('GET', () => {
    it('sucess', async () => {
      request.params = {
        name: 'charmander'
      }

      const mockedfindPokemonByName = findPokemonByName as Mock
      const mockedJson = json as Mock
      mockedJson.mockResolvedValueOnce(convertResponse(pokemon, header))
      mockedfindPokemonByName.mockResolvedValueOnce({
        data: [
          {
            pokemon: pokemon
          }
        ]
      })

      const response = await GET(request)

      expect(mockedfindPokemonByName).toHaveBeenNthCalledWith(1, 'charmander')
      expect(mockedJson).toHaveBeenNthCalledWith(1, pokemon, header)
      expect(response).toStrictEqual({ pokemon, header })
    })

    it('error', async () => {
      request.params = {
        name: 'notExist'
      }
      const mockedfindPokemonByName = findPokemonByName as Mock
      const mockedError = error as Mock
      mockedError.mockImplementation(convertError())
      mockedfindPokemonByName.mockResolvedValue({
        data: []
      })

      await expect(GET(request)).rejects.toThrowError('404: not found')
    })
  })

  describe('PUT', () => {
    it('sucess', async () => {
      const changedPokemon = { ...pokemon, notes: 'change' }
      const mockedValidatePokemon = validatePokemon as Mock
      mockedValidatePokemon.mockResolvedValueOnce(validForm)
      request.request.json = () => promiseOfPokemon(changedPokemon)
      const mockedUpdatePokemon = updatePokemon as Mock
      mockedUpdatePokemon.mockResolvedValueOnce({ data: [changedPokemon], error: null })
      const mockedJson = json as Mock
      mockedJson.mockResolvedValueOnce(convertResponse(changedPokemon, header))

      const response = await PUT(request)

      expect(mockedUpdatePokemon).toHaveBeenNthCalledWith(1, changedPokemon)
      expect(mockedValidatePokemon).toHaveBeenNthCalledWith(1, changedPokemon)
      expect(response).toStrictEqual({ pokemon: changedPokemon, header })
    })

    it('validation error', async () => {
      const changedPokemon = { ...pokemon, notes: 'change' }
      const mockedValidatePokemon = validatePokemon as Mock
      mockedValidatePokemon.mockResolvedValueOnce(invalidForm)
      request.request.json = () => promiseOfPokemon(changedPokemon)
      const mockedError = error as Mock
      mockedError.mockImplementation(convertError())

      await expect(PUT(request)).rejects.toThrowError(`400: validation errors: {
  "notes": [
    "String must contain at least 5 character(s)"
  ]
}`)
    })

    it('database no data', async () => {
      const changedPokemon = { ...pokemon, notes: 'change' }
      const mockedValidatePokemon = validatePokemon as Mock
      mockedValidatePokemon.mockResolvedValueOnce(validForm)
      request.request.json = () => promiseOfPokemon(changedPokemon)
      const mockedUpdatePokemon = updatePokemon as Mock
      mockedUpdatePokemon.mockResolvedValueOnce({ data: [], error: null })
      const mockedError = error as Mock
      mockedError.mockImplementation(convertError())

      await expect(PUT(request)).rejects.toThrowError(`400: can´t save pokemon`)
    })
    it('database error', async () => {
      const changedPokemon = { ...pokemon, notes: 'change' }
      const mockedValidatePokemon = validatePokemon as Mock
      mockedValidatePokemon.mockResolvedValueOnce(validForm)
      request.request.json = () =>
        new Promise(function (resolve, _) {
          setTimeout(() => resolve(changedPokemon))
        })
      const mockedUpdatePokemon = updatePokemon as Mock
      mockedUpdatePokemon.mockResolvedValueOnce({
        data: [],
        error: { message: 'fehler', details: 'more details', hint: 'something', code: '123' }
      })
      const mockedError = error as Mock
      mockedError.mockImplementation(convertError())

      await expect(PUT(request)).rejects.toThrowError(`400: can´t save pokemon fehler`)
    })
  })
})
