import DrawerTest from '$lib/components/DrawerTest.svelte'
import { fireEvent, render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'

describe('PokedexDrawer component', async () => {
  it('should render the component', async () => {
    render(DrawerTest)

    const button = screen.getByRole('button')
    await fireEvent.click(button)
    const heading = screen.getByRole('heading', { level: 2 })
    const navigation = screen.getByRole('navigation')

    expect(heading).toHaveTextContent('Navigation')
    expect(navigation).toBeInTheDocument()
  })
})
