import { render, screen, within } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import Pokemons from '$lib/components/Pokemons.svelte'

// https://github.com/davipon/svelte-component-test-recipes
describe('Pokemons page', async () => {
  it('should render the page', () => {
    render(Pokemons, {
      url: new URL('https://test.de'),
      initalPokemons: [
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
    })

    const heading = screen.getByRole('heading', { level: 1 })
    const searchbox = screen.getByRole('searchbox')
    const typeButtons = screen.getAllByTestId('typeFilter')
    const pokemonLinks = screen.getAllByRole('link')
    const pokeImages = screen.getAllByRole('img')
    const bulbasaur = pokemonLinks[0]
    const bulbasaurHeading = within(bulbasaur).getByRole('heading')
    const pikachu = pokemonLinks[1]
    const pikachuHeading = within(pikachu).getByRole('heading')

    expect(heading).toHaveTextContent('Pokemons')
    expect(searchbox).toBeInTheDocument()
    expect(typeButtons[0]).toHaveTextContent('electric')
    expect(typeButtons[1]).toHaveTextContent('grass')
    expect(typeButtons[2]).toHaveTextContent('poison')
    expect(bulbasaur).toHaveAccessibleName('show details for bulbasaur')
    expect(bulbasaurHeading).toHaveTextContent('bulbasaur')
    expect(pokeImages[0]).toHaveAccessibleName('official artwork of bulbasaur')
    expect(pikachu).toHaveAccessibleName('show details for pikachu')
    expect(pikachuHeading).toHaveTextContent('pikachu')
    expect(pokeImages[1]).toHaveAccessibleName('official artwork of pikachu')
  })
})
