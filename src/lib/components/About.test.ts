import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import About from '$lib/components/About.svelte'

describe('About page', async () => {
  it('should render the page', () => {
    render(About)

    const heading = screen.getByRole('heading', { level: 1 })
    const links = screen.getAllByRole('link')
    const homeLink = links[0]
    const pokemonLink = links[1]
    
    expect(heading).toHaveTextContent('Credits')
    expect(homeLink).toHaveTextContent('Home')
    expect(pokemonLink).toHaveTextContent('Pokemon')
    expect(links).toHaveLength(4)
  })
})
