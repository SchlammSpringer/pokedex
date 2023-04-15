import PokedexAppShell from '$lib/components/PokedexAppShell.svelte'
import SlotTest from '$lib/components/SlotTest.svelte'
import {  render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'

describe('PokedexAppShell page', async () => {
  it('should render the component', () => {
    render(PokedexAppShell, { currentPath: '/', })

    const appShell = screen.getByTestId('app-shell')
    const navigation = screen.getByLabelText('Navigation')
    const main = screen.getByRole('main')

    expect(appShell).toBeInTheDocument()
    expect(navigation).toBeInTheDocument()
    expect(main).toBeInTheDocument()
    
  })
  it('slot is rendered', () => {
    const { getByTestId } = render(SlotTest, {
      props: { Component:  PokedexAppShell }
    });
    expect(getByTestId('slot')).toHaveTextContent('Test Data');
  })
})
