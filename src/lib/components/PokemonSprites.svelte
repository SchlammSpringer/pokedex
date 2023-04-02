<script lang="ts">
  import { spriteBackUrl, spriteShinyBackUrl, spriteShinyUrl, spriteUrl } from '$lib/share.js'
  import type { Pokemon } from '$lib/types'
  import { Avatar } from '@skeletonlabs/skeleton'

  export let pokemon: Pokemon
</script>

<h3>Sprites</h3>
<div class="flex space-x-2 justify-between">
  <Avatar
    width="w-32"
    border="border-4 border-surface-300-600-token hover:!border-primary-500"
    src="{spriteUrl + pokemon.pokedex}.png"
    alt={`${pokemon.name} front view`}
  />
  <Avatar
    width="w-32"
    border="border-4 border-surface-300-600-token hover:!border-primary-500"
    src="{spriteShinyUrl + pokemon.pokedex}.png"
    alt={`${pokemon.name} front view`}
  />
  <Avatar
    width="w-32"
    border="border-4 border-surface-300-600-token hover:!border-primary-500"
    src="{spriteBackUrl + pokemon.pokedex}.png"
    alt={`${pokemon.name} back view`}
  />
  <Avatar
    width="w-32"
    border="border-4 border-surface-300-600-token hover:!border-primary-500"
    src="{spriteShinyBackUrl + pokemon.pokedex}.png"
    alt={`${pokemon.name} back view`}
  />
</div>

<style>
</style>
