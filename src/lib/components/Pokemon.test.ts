import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import Pokemon from '$lib/components/Pokemon.svelte'

// https://github.com/davipon/svelte-component-test-recipes
describe('Pokemon page', async () => {
  it('should render the page', async () => {
    render(Pokemon, {
      form: {
        pokedex: 1,
        name: 'bulbasaur',
        description: 'Dieses Pokémon trägt von Geburt an einen Samen auf dem Rücken,',
        types: ['grass', 'poison'],
        color: 'green',
        germanName: 'Bisasam',
        habitat: 'grassland'
      },
      errors: {},
      constraints: {},
    })

    const links = screen.getAllByRole('link')
    const heading = screen.getByRole('heading', { level: 1 })
    const heading2 = screen.getByRole('heading', { level: 2 })
    const graphics = await screen.findAllByRole('img')
    const headings3 = screen.getAllByRole('heading', { level: 3 })
    const description = screen.getByTestId('description')
    const habitat = screen.getByTestId('habitat')
    const submit = screen.getByRole('button')

    expect(heading).toHaveTextContent('bulbasaur')
    expect(heading2).toHaveTextContent('Bisasam')
    expect(graphics[0]).toHaveAccessibleName('Habitat of bulbasaur')
    expect(graphics[1]).toHaveAccessibleName('official artwork of bulbasaur')
    expect(headings3[0]).toHaveTextContent('Sprites')
    expect(graphics[2]).toHaveAccessibleName('bulbasaur classic sprite front view')
    expect(graphics[3]).toHaveAccessibleName('bulbasaur classic sprite back view')
    expect(graphics[4]).toHaveAccessibleName('bulbasaur shiny sprite front view')
    expect(graphics[5]).toHaveAccessibleName('bulbasaur shiny sprite back view')
    expect(headings3[1]).toHaveTextContent('Description')
    expect(description).toHaveTextContent('Dieses Pokémon trägt von Geburt an einen Samen auf dem Rücken,')
    expect(headings3[2]).toHaveTextContent('Habitat')
    expect(habitat).toHaveTextContent('grassland')
    expect(headings3[3]).toHaveTextContent('Favorite color')
    expect(headings3[4]).toHaveTextContent('Types')
    expect(headings3[5]).toHaveTextContent('Notes')
    expect(submit).toHaveTextContent('save Bulbasaur')
    expect(links[2]).toHaveTextContent('back to Pokemons')
  })
})
