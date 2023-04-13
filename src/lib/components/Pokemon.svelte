<script lang="ts">
  import PokemonHeader from '$lib/components/PokemonHeader.svelte'
  import PokemonSprites from '$lib/components/PokemonSprites.svelte'
  import PokemonTypes from '$lib/components/PokemonTypes.svelte'
  import type { Pokemon } from '$lib/types'
  import type { ValidationErrors } from 'sveltekit-superforms/index'
  import type { AnyZodObject } from 'zod'
  import PokemonForm from '$lib/components/PokemonForm.svelte'

  export let form: Pokemon
  export let errors: ValidationErrors<AnyZodObject>
  export let constraints: Partial<any>

</script>

<div class="card overflow-hidden">
  <header class="relative">
    <PokemonHeader pokemon={form} />
  </header>
  <section class="p-4 space-y-4">
    <PokemonSprites pokemon={form} />
    <h3>Description</h3>
    <p class="whitespace-pre-line" data-testid="description">{form.description}</p>
    <hr class="opacity-50" />
    <h3>Habitat</h3>
    <p
      class="text-2xl bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent
            box-decoration-clone first-letter:uppercase"
    >
      {form.habitat}
    </p>
    <hr class="opacity-50" />
    <h3>Favorite color</h3>
    {#if form.color === 'gray'}
      <div class="w-fit rounded-full" style="background-color: gray">
        <span class="font-bold p-4" style="color: white">{form.color}</span>
      </div>
    {:else}
      <div class="w-fit rounded-lg" style="background-color: {form.color}">
        <span class="invert font-bold p-4" style="color: {form.color}">{form.color}</span>
      </div>
    {/if}
    <hr class="opacity-50" />
    <PokemonTypes pokemon={form} />
    <hr class="opacity-50" />
    <PokemonForm {form} {errors} {constraints}/>
  </section>
</div>

<style>
</style>
