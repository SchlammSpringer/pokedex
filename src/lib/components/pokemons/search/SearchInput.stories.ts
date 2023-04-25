import SearchInput from './SearchInput.svelte'
import type { Meta, StoryObj } from '@storybook/svelte'

const meta = {
  title: 'Pokemons/Search/Search Input',
  component: SearchInput,
  tags: ['autodocs'],
  args: {
    searchTerm: ''
  }
} satisfies Meta<SearchInput>

export default meta
type Story = StoryObj<typeof SearchInput>

export const Default: Story = {}
