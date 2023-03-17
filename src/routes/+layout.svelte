<script lang='ts'>
  // The ordering of these imports is critical to your app working properly
  import '@skeletonlabs/skeleton/themes/theme-modern.css'
  // If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
  import '@skeletonlabs/skeleton/styles/all.css'
  // Most of your app wide CSS should be put in this file
  import '../app.postcss'
  import { AppBar, AppShell } from '@skeletonlabs/skeleton'
</script>

<!-- App Shell -->
<AppShell slotSidebarLeft='bg-surface-500/5 w-56 p-4'>
  <svelte:fragment slot='header'>
    <!-- App Bar -->
    <AppBar>
      <svelte:fragment slot='lead'>
        <strong class='text-xl uppercase'>Pokedex</strong>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <svelte:fragment slot='sidebarLeft'>
    <!-- Insert the list: -->
    <nav class='list-nav'>
      <ul>
        <li><a href='/'>Home</a></li>
        <li><a href='/pokemons'>Pokemons</a></li>
        <li><a href='/about'>About</a></li>
      </ul>
    </nav>
    <!-- --- -->
  </svelte:fragment>

  <!-- Page Route Content -->
  <slot />
</AppShell>
