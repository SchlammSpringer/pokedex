<script lang="ts">
  import PokedexAppShell from '$lib/components/PokedexAppShell.svelte'
  import PokedexDrawer from '$lib/components/PokedexDrawer.svelte'
  // The ordering of these imports is critical to your app working properly
  import '@skeletonlabs/skeleton/themes/theme-modern.css'
  // If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
  import '@skeletonlabs/skeleton/styles/all.css'
  // Most of your app wide CSS should be put in this file
  import { browser, dev } from '$app/environment'
  import { afterNavigate } from '$app/navigation'
  import { webVitals } from '$lib/vital'
  import { inject } from '@vercel/analytics'
  import '../app.postcss'
  import { page } from '$app/stores'

  inject({ mode: dev ? 'development' : 'production' })

  let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID

  export let data

  $: if (browser && analyticsId) {
    webVitals({
      path: data.pathname,
      params: $page.params,
      analyticsId
    })
  }

  // TODO: Workaround SvelteKist should do this by default, but Skeleton overwrites it
  afterNavigate((nav) => {
    if (nav.type == 'link') document.getElementById('page')?.scrollTo(0, 0)
  })
</script>

<svelte:head>
  <title>Pokedex</title>
</svelte:head>
<PokedexDrawer currentPath={data.pathname} />
<!-- App Shell -->
<PokedexAppShell currentPath={data.pathname}>
  <slot />
</PokedexAppShell>
