<script>
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf'
  import PokemonHeader from './PokemonHeader.svelte'
</script>

<Meta title="Pokemon/Header" component={PokemonHeader} />
<Template let:args>
  <PokemonHeader {...args}>
  </PokemonHeader>
</Template>

<Story name="Default" args={{pokemon: { pokedex: 123, name: 'bestomonio', habitat: 'cave', germanName: 'Bestesto' }}} />