<script lang="ts">
  import FavoriteColor from './FavoriteColor.svelte'

  import PokemonHeader from './PokemonHeader.svelte'
  import PokemonSprites from './PokemonSprites.svelte'
  import PokemonTypes from './PokemonTypes.svelte'
  import type { Pokemon } from '$lib/types'
  import type { ValidationErrors } from 'sveltekit-superforms/index'
  import type { AnyZodObject } from 'zod'
  import PokemonForm from './PokemonForm.svelte'

  export let form: Pokemon
  export let errors: ValidationErrors<AnyZodObject>
  export let constraints: Partial<any>
</script>

<div class="card overflow-hidden">
  <PokemonHeader pokemon={form} />
  <section class="p-4 space-y-4">
    <PokemonSprites pokemon={form} />
    <h3>Description</h3>
    <p class="whitespace-pre-line" data-testid="description">{form.description}</p>
    <hr class="opacity-50" />
    <h3>Habitat</h3>
    <p
      data-testid="habitat"
      class="text-2xl bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent
            box-decoration-clone first-letter:uppercase"
    >
      {form.habitat}
    </p>
    <hr class="opacity-50" />
    <FavoriteColor color={form.color} />
    <hr class="opacity-50" />
    <PokemonTypes pokemon={form} />
    <hr class="opacity-50" />
    <PokemonForm {form} {errors} {constraints} />
    <a href="../pokemons" class="flex btn variant-filled-secondary">back to Pokemons</a>
  </section>
</div>

<style>
</style>
