<script lang="ts">
  import { page } from '$app/stores'
  import { drawerStore } from '@skeletonlabs/skeleton'

  const drawerClose = () => drawerStore.close()

  export let href: string
  $: current = $page.url.pathname === href
</script>

<a class:bg-primary-active-token={current}
   class="font-medium"
   {href} {...$$props} on:click={drawerClose}>
  <slot />
</a>
