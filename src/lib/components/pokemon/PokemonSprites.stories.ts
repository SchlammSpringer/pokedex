import PokemonSprites from './PokemonSprites.svelte'
import type { Meta, StoryObj } from '@storybook/svelte'

const meta = {
  title: 'Pokemon/Sprites',
  component: PokemonSprites,
 
  tags: ['autodocs'],
  args: {
    pokemon: { pokedex: 151, name: 'bestomonio' }
  }
} satisfies Meta<PokemonSprites>

export default meta
type Story = StoryObj<typeof PokemonSprites>

export const Default: Story = {}


