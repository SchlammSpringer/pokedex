import { selectAllPokemons } from '$lib/server/db-queries'
import { fetchPokemon, getAllPokemons } from '$lib/server/share'
import type { Pokemon } from '$lib/types'
import { json } from '@sveltejs/kit'
import * as TE from 'fp-ts/lib/TaskEither'
import { vi, type Mock } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'
import { GET, config } from './+server'

const fetchMocker = createFetchMock(vi)
fetchMocker.enableMocks()

describe('Pokemon list API', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  vi.mock('@sveltejs/kit')
  vi.mock('$lib/server/db-queries')
  vi.mock('$lib/server/share')

  const pokemonsFromApi = {
    results: [{ url: 'https://pokemon/1' }, { url: 'https://pokemon/2' }]
  }

  const pokemons: Pokemon[] = [
    {
      pokedex: 1,
      name: 'bulbasaur',
      description: 'Dieses Pokémon trägt von Geburt an einen Samen auf dem Rücken,',
      types: ['grass', 'poison'],
      color: 'green',
      germanName: 'Bisasam',
      habitat: 'grassland'
    },
    {
      pokedex: 25,
      name: 'pikachu',
      description: 'Es hat kleine Backentaschen',
      types: ['electric'],
      color: 'yellow',
      germanName: 'Pikachu',
      habitat: 'forest'
    }
  ]

  const mockedFindPokemons = selectAllPokemons as Mock
  const mockedFetchPokemon = fetchPokemon as Mock

  interface Response {
    pokemons: Pokemon[]
    header: Record<string, string>
  }

  const convertResponse = () => (pokemons: Pokemon[], header: Record<string, string>) =>
    ({
      pokemons,
      header
    } satisfies Response)

  const header = {
    headers: { 'Cache-Control': 'public, max-age=0, s-maxage=86400' }
  }
  it('check vercel config', () => {
    expect(config).toMatchSnapshot()
  })

  describe('GET', () => {
    it('from pokeapi', async () => {
      mockedFindPokemons.mockResolvedValue({ data: [] })
      fetchMocker.mockIf('https://pokeapi.co/api/v2/pokemon?limit=151', () =>
        JSON.stringify(pokemonsFromApi)
      )
      const mockedGetAllPokemons = getAllPokemons as Mock
      mockedGetAllPokemons.mockImplementation(TE.of(pokemonsFromApi))
      mockedFetchPokemon.mockResolvedValueOnce(pokemons[0])
      mockedFetchPokemon.mockResolvedValueOnce(pokemons[1])
      const mockedJson = json as Mock
      mockedJson.mockImplementation(convertResponse())

      const response = await GET()

      expect(response).toStrictEqual({ pokemons, header })
    })

    it('from db ', async () => {
      mockedFindPokemons.mockResolvedValue({
        data: [{ pokemon: pokemons[0] }, { pokemon: pokemons[1] }]
      })
      const mockedJson = json as Mock
      mockedJson.mockImplementation(convertResponse())

      const response = await GET()

      expect(mockedFindPokemons).toHaveBeenCalledTimes(1)
      expect(response).toStrictEqual({ pokemons, header })
    })
  })
})
