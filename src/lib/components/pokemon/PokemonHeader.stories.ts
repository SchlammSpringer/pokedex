import PokemonHeader from './PokemonHeader.svelte'
import type { Meta, StoryObj } from '@storybook/svelte'

const meta = {
  title: 'Pokemon/Header',
  component: PokemonHeader,
 
  tags: ['autodocs'],
  args: {
    pokemon: { pokedex: 123, name: 'bestomonio', habitat: 'cave', germanName: 'Bestesto' }
  }
} satisfies Meta<PokemonHeader>

export default meta
type Story = StoryObj<typeof PokemonHeader>

export const Default: Story = {}


