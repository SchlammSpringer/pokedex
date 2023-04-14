import { render, screen, within } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import Navigation from '$lib/components/Navigation.svelte'

describe('Navigation', async () => {
  it('should render the page', () => {
    render(Navigation, { currentPath: '/' })

    const navigation = screen.getByRole('navigation')
    const links = within(navigation).getAllByRole('link')

    expect(links[0]).toHaveTextContent('Home')
    expect(links[0]).toHaveClass('bg-primary-active-token')
    expect(links[1]).toHaveTextContent('Pokemons')
    expect(links[2]).toHaveTextContent('About')
  })
  it('active Pokemon as navigation', () => {
    render(Navigation, { currentPath: '/pokemons/bulbasaur' })

    const navigation = screen.getByRole('navigation')
    const links = within(navigation).getAllByRole('link')

    expect(links[0]).toHaveTextContent('Home')
    expect(links[1]).toHaveTextContent('Pokemons')
    expect(links[2]).toHaveTextContent('bulbasaur')
    expect(links[2]).toHaveClass('bg-primary-active-token')
    expect(links[3]).toHaveTextContent('About')
  })
})
