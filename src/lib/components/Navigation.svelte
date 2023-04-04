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
      if (target && target.tagName == 'A') {
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
      {#if active.split('/').length === 3}
        <ul>
          <li class="pl-8">
            <NavigationLink href={active}>
              <span class="first-letter:uppercase">
                {active.split('/')[2]}
              </span>
            </NavigationLink>
          </li>
        </ul>
      {/if}
    </li>
    <li>
      <NavigationLink href="/about">About</NavigationLink>
    </li>
  </ul>
</nav>
