import PokemonCard from './PokemonCard.svelte'
import type { Meta, StoryObj } from '@storybook/svelte'

const meta = {
  title: 'Pokemons/Pokemon Card',
  component: PokemonCard,
  tags: ['autodocs'],
  args: {
    pokemon: { pokedex: 123, name: 'bestomonio' }
  }
} satisfies Meta<PokemonCard>

export default meta
type Story = StoryObj<typeof PokemonCard>

export const Default: Story = {}
