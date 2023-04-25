<script lang="ts">
  import { enhance } from '$app/forms'
  import { capitalizeFirstLetter } from '$lib/share'
  import type { Pokemon } from '$lib/types'
  import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton'
  import type { ValidationErrors } from 'sveltekit-superforms/index'
  import type { AnyZodObject } from 'zod'

  export let form: Pokemon
  export let errors: ValidationErrors<AnyZodObject>
  export let constraints: Partial<any>

  let creating = false

  const errorToast = (errorMessage: string): ToastSettings => ({
    message: errorMessage,
    background: 'variant-filled-error',
    timeout: 5000,
    autohide: true
  })

  const successToast: ToastSettings = {
    message: `Notes for ${form.name} saved.`,
    background: 'variant-filled-success',
    timeout: 5000
  }
</script>

<form
  method="POST"
  use:enhance={() => {
    creating = true
    return async ({ result, update }) => {
      await update()
      creating = false
    
      switch (result.type) {
        case 'success':
          toastStore.trigger(successToast)
          break
        case 'failure':
          toastStore.trigger(errorToast(errors.notes))
          break
      }
    }
  }}
>
  <input type="hidden" name="pokedex" value={form.pokedex} />
  <input type="hidden" name="color" value={form.color} />
  <input type="hidden" name="description" value={form.description} />
  <input type="hidden" name="germanName" value={form.germanName} />
  <input type="hidden" name="name" value={form.name} />
  {#each form.types as type}
    <input type="hidden" name="types" value={type} />
  {/each}
  <input type="hidden" name="habitat" value={form.habitat} />
  <label class="label">
    <h3>Notes</h3>

    <textarea
      readonly={creating}
      class:input-success={creating}
      class="textarea"
      rows="4"
      name="notes"
      data-invalid={errors.notes}
      class:input-error={errors.notes}
      {...constraints.notes}
      placeholder="My thoughts about {form.name}"
      bind:value={form.notes}
    />
  </label>
  <button type="submit" class="mt-4 flex w-full btn variant-filled-primary">save {capitalizeFirstLetter(form.name)}</button>
</form>

<style>
</style>
