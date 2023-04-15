<script lang="ts">
  import Navigation from '$lib/components/Navigation.svelte'
  import { Drawer } from '@skeletonlabs/skeleton'

  export let currentPath: string

</script>

<Drawer width="w-70">
  <h2 class="p-4">Navigation</h2>
  <hr />
  <Navigation {currentPath} />
</Drawer>

