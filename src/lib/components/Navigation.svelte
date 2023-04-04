<script lang="ts">
  import { page } from '$app/stores'
  import { drawerStore } from '@skeletonlabs/skeleton'
  import { onMount } from 'svelte'
  import NavigationLink from './NavigationLink.svelte'

  function drawerClose(): void {
    drawerStore.close()
  }

  let nav: HTMLElement

  onMount(() => {
    nav.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target && target.tagName == 'NavigationLink') {
        drawerClose()
      }
    })
  })

  $: active = $page.url.pathname

</script>

<nav class="list-nav p-4" bind:this={nav}>
  <ul>
    <li>
      <NavigationLink href="/">Home</NavigationLink>
    </li>
    <li>
      <NavigationLink href="/pokemons">Pokemons</NavigationLink>
    </li>
    <li>
      <NavigationLink href="/about">About</NavigationLink>
    </li>
  </ul>
</nav>
