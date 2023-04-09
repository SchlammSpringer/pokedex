<script lang="ts">
  import PokemonHeader from '$lib/components/PokemonHeader.svelte'
  import PokemonSprites from '$lib/components/PokemonSprites.svelte'
  import PokemonTypes from '$lib/components/PokemonTypes.svelte'
  import { superForm } from 'sveltekit-superforms/client'
  import type { PageData } from './$types'
  import { enhance } from '$app/forms'

  export let data: PageData

  const { form, errors, constraints } = superForm(data.form)
</script>

<div class="container mx-auto p-4 space-y-8">
  <div class="card overflow-hidden">
    <header class="relative">
      <PokemonHeader pokemon={$form} />
    </header>
    <section class="p-4 space-y-4">
      <PokemonSprites pokemon={$form} />
      <h3>Description</h3>
      <p class="whitespace-pre-line">{$form.description}</p>
      <hr class="opacity-50" />
      <h3>Habitat</h3>
      <p
        class="text-2xl bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent
            box-decoration-clone first-letter:uppercase"
      >
        {$form.habitat}
      </p>
      <hr class="opacity-50" />
      <h3>Favorite color</h3>
      {#if $form.color === 'gray'}
        <div class="w-fit rounded-full" style="background-color: gray">
          <span class="font-bold p-4" style="color: white">{$form.color}</span>
        </div>
      {:else}
        <div class="w-fit rounded-lg" style="background-color: {$form.color}">
          <span class="invert font-bold p-4" style="color: {$form.color}">{$form.color}</span>
        </div>
      {/if}
      <hr class="opacity-50" />
      <PokemonTypes pokemon={$form} />
      <hr class="opacity-50" />
      <form method="POST" use:enhance>
        <input type="hidden" name="pokedex" value={$form.pokedex} />
        <input type="hidden" name="color" value={$form.color} />
        <input type="hidden" name="description" value={$form.description} />
        <input type="hidden" name="germanName" value={$form.germanName} />
        <input type="hidden" name="name" value={$form.name} />
        {#each $form.types as type}
          <input type="hidden" name="types" value={type} />
        {/each}
        <input type="hidden" name="habitat" value={$form.habitat} />
        <label class="label">
          <h3>Notes</h3>
          {#if $errors.notes}
            <div class="alert variant-filled-error">
              <span class="alert-message">{$errors.notes}</span>
            </div>
          {/if}
          <textarea
            class="textarea"
            rows="4"
            name="notes"
            data-invalid={$errors.notes}
            class:input-error={$errors.notes}
            {...$constraints.notes}
            placeholder="My thoughts about {$form.name}"
            bind:value={$form.notes}
          />
        </label>
        <button type="submit" class="btn variant-filled-primary">Submit</button>
      </form>
    </section>
  </div>
</div>

<style>
</style>
