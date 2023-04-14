<script lang="ts">
  import { drawerStore } from '@skeletonlabs/skeleton'

  const drawerClose = () => drawerStore.close()

  export let currentPath: string
  export let href: string
  $: active = currentPath === href
</script>

<a class:bg-primary-active-token={active}
   class="font-medium"
   {href} {...$$props} on:click={drawerClose}>
  <slot />
</a>
