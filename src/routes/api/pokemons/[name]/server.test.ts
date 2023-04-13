import type { Mock } from 'vitest'
import { describe, expect, it, vi } from 'vitest'
import { GET } from './+server'
import { findPokemonByName } from '$lib/server/db-queries'
import type { RequestEvent } from '@sveltejs/kit'
import { error, json } from '@sveltejs/kit'
import { mock } from 'vitest-mock-extended'
import type { Pokemon } from '$lib/types'

const convertError = () => (statuscode: number, message: string) =>
  new Error(`${statuscode}: ${message}`)

interface Response {
  pokemon: Pokemon
  header: Record<string, string>
}

const convertResponse = () => (pokemon: Pokemon, header: Record<string, string>) =>
  ({
    pokemon,
    header
  } satisfies Response)

describe('single Pokemon API', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  vi.mock('@sveltejs/kit')
  vi.mock('$lib/server/db-queries')
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

  describe('GET', () => {
    it('sucess', async () => {
      request.params = {
        name: 'charmander'
      }
      const header = {
        headers: { 'Cache-Control': 'public, s-maxage=1, stale-while-revalidate' }
      }
      const mockedfindPokemonByName = findPokemonByName as Mock
      const mockedJson = json as Mock
      mockedJson.mockImplementation(convertResponse())
      mockedfindPokemonByName.mockResolvedValue({
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
      // PUT({'name': 'Shitty-Charmander'} )
    })
    it('error', async () => {
      // PUT({'name': 'Shitty-Charmander'} )
    })
  })
})
