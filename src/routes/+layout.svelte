<script lang="ts">
  // The ordering of these imports is critical to your app working properly
  import '@skeletonlabs/skeleton/themes/theme-modern.css'
  // If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
  import '@skeletonlabs/skeleton/styles/all.css'
  // Most of your app wide CSS should be put in this file
  import '../app.postcss'
  import { AppBar, AppShell } from '@skeletonlabs/skeleton'
  import { QueryClientProvider } from '@tanstack/svelte-query'
  import type { PageData } from './$types'
  import { browser, dev } from '$app/environment'
  import { inject } from '@vercel/analytics'
  import { webVitals } from '$lib/vitals'
  import { page } from '$app/stores'

  inject({ mode: dev ? 'development' : 'production' })

  let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID
  $: if (browser && analyticsId) {
    webVitals({
      path: $page.url.pathname,
      params: $page.params,
      analyticsId
    })
  }

  export let data: PageData
</script>

<!-- App Shell -->
<AppShell>
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar>
      <svelte:fragment slot="lead">
        <strong class="text-xl uppercase">Pokedex</strong>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <svelte:fragment slot="sidebarLeft">
    <div id="sidebar-left" class="hidden lg:block">
      <nav class="list-nav p-4">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/pokemons">Pokemons</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </div>
  </svelte:fragment>

  <!-- Page Route Content -->
  <QueryClientProvider client={data.queryClient}>
    <slot />
  </QueryClientProvider>
</AppShell>
