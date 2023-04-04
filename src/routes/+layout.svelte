<script lang="ts">
  // The ordering of these imports is critical to your app working properly
  import '@skeletonlabs/skeleton/themes/theme-modern.css'
  // If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
  import '@skeletonlabs/skeleton/styles/all.css'
  // Most of your app wide CSS should be put in this file
  import { browser, dev } from '$app/environment'
  import { page } from '$app/stores'
  import { webVitals } from '$lib/vital'
  import Navigation from '$lib/components/Navigation.svelte'
  import { AppBar, AppShell, Drawer, drawerStore } from '@skeletonlabs/skeleton'
  import { inject } from '@vercel/analytics'
  import '../app.postcss'
  import { afterNavigate } from '$app/navigation'

  inject({ mode: dev ? 'development' : 'production' })

  let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID

  $: if (browser && analyticsId) {
    webVitals({
      path: $page.url.pathname,
      params: $page.params,
      analyticsId
    })
  }

  const drawerOpen = () => drawerStore.open({})

  afterNavigate((nav) => {
    if (nav.type == 'link') document.getElementById('page')?.scrollTo(0, 0)
  })
</script>

<svelte:head>
  <title>Pokedex</title>
</svelte:head>
<Drawer width="w-70">
  <h3 class="p-4">Navigation</h3>
  <hr />
  <Navigation />
</Drawer>

<!-- App Shell -->
<AppShell regionPage="shrink-0" slotSidebarLeft="bg-surface-500/5 w-0 lg:w-56">
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar>
      <svelte:fragment slot="lead">
        <div class="flex shrink-0 items-center">
          <button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
            <span>
              <i class="fa-solid fa-bars" />
            </span>
          </button>
          <strong class="text-lg md:text-xl truncate">Pokedex</strong>
        </div>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    <Navigation />
  </svelte:fragment>
  <!-- Page Route Content -->
  <slot />
</AppShell>
