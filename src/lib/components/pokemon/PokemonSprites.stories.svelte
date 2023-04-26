<script>
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf'
  import PokemonSprites from './PokemonSprites.svelte'
</script>

<Meta title="Pokemon/Sprites" component={PokemonSprites} />
<Template let:args>
  <PokemonSprites {...args}>
  </PokemonSprites>
</Template>

<Story name="Default" args={{pokemon: { pokedex: 123, name: 'bestomonio', habitat: 'cave', germanName: 'Bestesto' }}} />