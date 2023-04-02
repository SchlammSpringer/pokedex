import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import Pokemons from './Pokemons.svelte'

// https://github.com/davipon/svelte-component-test-recipes
describe('Pokemons page', () => {
  it('should render the page', () => {
    render(Pokemons, {
      initalPokemons: [
        {
          pokedex: 1,
          name: 'bulbasaur',
          description:
            'Dieses Pokémon trägt von Geburt an einen Samen auf dem Rücken, der mit ihm keimt und wächst.\nBisasam macht gern einmal ein Nickerchen im Sonnenschein. Auf seinem Rücken trägt es einen Samen. Indem es Sonnenstrahlen aufsaugt, wird der Samen zunehmend größer.',
          types: ['grass', 'poison'],
          color: 'green',
          germanName: 'Bisasam',
          habitat: 'grassland'
        }
      ]
    })

    const heading = screen.getByRole('heading', { level: 1 })
    screen.debug()
    expect(heading).toHaveTextContent('Pokemons')
  })
})
