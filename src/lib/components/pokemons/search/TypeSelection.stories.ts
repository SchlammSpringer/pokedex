import TypeSelection from './TypeSelection.svelte'
import type { Meta, StoryObj } from '@storybook/svelte'

const meta = {
  title: 'Pokemons/Search/Type Selection',
  component: TypeSelection,
  tags: ['autodocs'],
  argTypes: {
    initialSelectedType: {
      description: 'Query param from pokemon detail page',
      type: 'string',
      control: 'text',
      defaultValue: 'undefined'
    },
    types: {  control: 'object' },
    filteredTypes: { control: 'object' }
  },
  args: {
    initialSelectedType: undefined,
    types: ['moon', 'star', 'planet'],
    filteredTypes: { moon: true, star: true, planet: true }
  }
} satisfies Meta<TypeSelection>

export default meta
type Story = StoryObj<typeof TypeSelection>

export const Default: Story = {}
export const WithInitialTypeDefaultOpen: Story = {
  args: {
    initialSelectedType: 'moon'
  }
}
export const ShowWarningInFilterActiveState: Story = {
  args: {
    filteredTypes: { moon: true, star: true, planet: false }
  }
}
