import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import Home from '$lib/components/Home.svelte'

describe('About page', async () => {
  it('should render the page', () => {
    render(Home)

    const heading = screen.getByRole('heading', { level: 1 })
    const links = screen.getAllByRole('link')
    const pokemonLink = links[0]
    const creditsLink = links[1]
    
    expect(heading).toHaveTextContent('Educational poject with SvelteKit & PokeAPI')
    expect(creditsLink).toHaveTextContent('Credits')
    expect(pokemonLink).toHaveTextContent('Pokemon')
  })
})
