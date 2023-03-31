import createFetchMock from 'vitest-fetch-mock'
import { describe, expect, it, vi } from 'vitest'
import type { Pokemon } from '$lib/types'
import { fetchPokemon } from './share'

const fetchMocker = createFetchMock(vi)
fetchMocker.enableMocks()

describe('fetch pokemons', () => {
  it('sucess', async () => {
    const expectedPokemon: Pokemon = {
      pokedex: 1,
      name: 'bulbasaur',
      description:
        'Dieses Pokémon trägt von Geburt an einen Samen auf dem Rücken, der mit ihm keimt und wächst.\nNach der Geburt nimmt es für eine Weile Nährstoffe über den Samen auf seinem Rücken auf.\nBisasam macht gern einmal ein Nickerchen im Sonnenschein. Auf seinem Rücken trägt es einen Samen. Indem es Sonnenstrahlen aufsaugt, wird der Samen zunehmend größer.\nBisasam macht gern einmal ein Nickerchen im Sonnenschein. Auf seinem Rücken trägt es einen Samen. Indem es Sonnenstrahlen aufsaugt, wird er zunehmend größer.\nEs kommt tagelang ohne Nahrung aus, da es in den Samen auf seinem Rücken Nährstoffe speichert.\nDieses Pokémon trägt von Geburt an einen Samen auf dem Rücken, der im Laufe der Zeit keimt und wächst.',
      types: ['grass', 'poison'],
      color: 'green',
      germanName: 'Bisasam',
      habitat: 'grassland'
    }
    fetchMocker.mockResponseOnce(
      JSON.stringify({
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
          url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
        },
        name: 'bulbasaur'
      })
    )

    const actualPokemon: Pokemon = await fetchPokemon(new URL('http://test.de'))

    expect(actualPokemon).toBe(expectedPokemon)
  })
})
