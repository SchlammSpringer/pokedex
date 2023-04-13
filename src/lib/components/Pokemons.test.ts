import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import Pokemons from '$lib/components/Pokemons.svelte'

// https://github.com/davipon/svelte-component-test-recipes
describe('Pokemons page', async () => {
  it('should render the page', () => {
    render(Pokemons, {
      initalPokemons: [
        {
          pokedex: 1,
          name: 'bulbasaur',
          description: 'Dieses Pokémon trägt von Geburt an einen Samen auf dem Rücken,',
          types: ['grass', 'poison'],
          color: 'green',
          germanName: 'Bisasam',
          habitat: 'grassland'
        }
      ]
    })

    const heading = screen.getByRole('heading', { level: 1 })
    const searchbox = screen.getByRole('searchbox')
    const typeButtons = screen.getAllByTestId('typeFilter')
    const pokemonLinks = screen.getAllByRole('link')
    expect(heading).toHaveTextContent('Pokemons')
    expect(typeButtons[0]).toHaveTextContent('grass')
    expect(typeButtons[1]).toHaveTextContent('poison')
    expect(pokemonLinks[0]).toHaveTextContent('bulbasaur')
  })
})
