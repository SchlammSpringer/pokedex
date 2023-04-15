<script lang="ts">
  import PageTransition from './PageTransition.svelte'
  import PokedexAppBar from '$lib/components/PokedexAppBar.svelte'
  import Navigation from '$lib/components/Navigation.svelte'
  import { AppShell, Toast } from '@skeletonlabs/skeleton'

  export let currentPath: string = '/'
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 hidden lg:flex lg:w-56">
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <PokedexAppBar />
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    <Navigation {currentPath} />
  </svelte:fragment>
  <!-- Page Route Content -->
  <Toast />
  <PageTransition {currentPath}><slot /></PageTransition>
</AppShell>
