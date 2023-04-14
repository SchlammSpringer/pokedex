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
  import { AppBar, AppShell, Drawer, Toast, drawerStore } from '@skeletonlabs/skeleton'
  import { inject } from '@vercel/analytics'
  import '../app.postcss'
  import { afterNavigate } from '$app/navigation'
  import { fly } from 'svelte/transition'
  import { cubicIn, cubicOut } from 'svelte/easing'

  inject({ mode: dev ? 'development' : 'production' })

  let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID
  let path: string

  $: if (browser) {
    path = $page.url.pathname
    if (analyticsId) {
      webVitals({
        path: $page.url.pathname,
        params: $page.params,
        analyticsId
      })
    }
  }

  const drawerOpen = () => drawerStore.open({})

  afterNavigate((nav) => {
    if (nav.type == 'link') document.getElementById('page')?.scrollTo(0, 0)
  })

  export let data
  const duration = 300
  const delay = duration + 100
  const y = 10

  const transitionIn = { easing: cubicOut, y, duration, delay }
  const transitionOut = { easing: cubicIn, y: -y, duration }
</script>

<svelte:head>
  <title>Pokedex</title>
</svelte:head>
<Drawer width="w-70">
  <h2 class="p-4">Navigation</h2>
  <hr />
  <Navigation currentPath={path} />
</Drawer>
<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 hidden lg:flex lg:w-56">
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar>
      <svelte:fragment slot="lead">
        <div class="flex items-center">
          <button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen} aria-label="Navigation">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </span>
          </button>
          <strong class="text-lg md:text-xl">Pokedex with SvelteKit</strong>
        </div>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    <Navigation currentPath={path} />
  </svelte:fragment>
  <!-- Page Route Content -->
  {#key data.pathname}
    <div in:fly={transitionIn} out:fly={transitionOut}>
      <Toast />
      <slot />
    </div>
  {/key}
</AppShell>
