import createFetchMock from 'vitest-fetch-mock'
import { describe, expect, it, vi } from 'vitest'
import type { Pokemon } from '$lib/types'
import { fetchPokemon } from './share'

const fetchMocker = createFetchMock(vi)
fetchMocker.enableMocks()

describe('fetch pokemons', () => {
  const pokemonFromApi = {
    types: [
      {
        type: {
          name: 'grass'
        }
      },
      {
        type: {
          name: 'poison'
        }
      }
    ],
    id: 1,
    species: {
      name: 'bulbasaur',
      url: 'https://pokemon.some/1'
    },
    name: 'bulbasaur'
  }
  const pokemonSpeciesFromApi = {
    color: {
      name: 'green'
    },
    habitat: {
      name: 'grassland'
    },
    names: [
      {
        name: 'Bulbizarre',
        language: {
          name: 'fr'
        }
      },
      {
        name: 'Bisasam',
        language: {
          name: 'de'
        }
      }
    ],
    flavor_text_entries: [
      {
        flavor_text: 'some english stuff',
        language: {
          name: 'en'
        }
      },
      {
        flavor_text:
          'Dieses Pokémon trägt von Geburt an einen Samen\nauf dem Rücken, der mit ihm keimt und wächst.',
        language: {
          name: 'de'
        }
      },
      {
        flavor_text:
          'Bisasam macht gern einmal ein Nickerchen im\nSonnenschein. Auf seinem Rücken trägt es einen\nSamen. Indem es Sonnenstrahlen aufsaugt,\nwird der Samen zunehmend größer.',
        language: {
          name: 'de'
        }
      }
    ]
  }

  it('sucess', async () => {
    const expectedPokemon: Pokemon = {
      pokedex: 1,
      name: 'bulbasaur',
      description:
        'Dieses Pokémon trägt von Geburt an einen Samen auf dem Rücken, der mit ihm keimt und wächst.\nBisasam macht gern einmal ein Nickerchen im Sonnenschein. Auf seinem Rücken trägt es einen Samen. Indem es Sonnenstrahlen aufsaugt, wird der Samen zunehmend größer.',
      types: ['grass', 'poison'],
      color: 'green',
      germanName: 'Bisasam',
      habitat: 'grassland'
    }
    fetchMocker.once(JSON.stringify(pokemonFromApi)).once(JSON.stringify(pokemonSpeciesFromApi))

    const fetchedPokemon: Pokemon = await fetchPokemon(new URL('http://test.de'))

    expect(fetchMocker.requests()[0].url).toEqual('http://test.de/')
    expect(fetchMocker.requests()[1].url).toEqual('https://pokemon.some/1')
    expect(fetchedPokemon).toStrictEqual(expectedPokemon)
  })
})
