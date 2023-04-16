<script lang="ts">
  import Pokemon from '$lib/components/Pokemon.svelte'
  import { superForm } from 'sveltekit-superforms/client'
  import type { PageData } from './$types'

  export let data: PageData
  const { form, errors, constraints } = superForm(data.form)
</script>

<div class="container mx-auto p-4 space-y-8">
  <Pokemon form={$form} errors={$errors} constraints={$constraints}></Pokemon>
</div>

<style>
</style>
