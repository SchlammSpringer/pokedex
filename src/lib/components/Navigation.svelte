<script lang="ts">
  import { page } from '$app/stores'
  import NavigationLink from './NavigationLink.svelte'

  $: active = $page.url.pathname
</script>

<nav class="list-nav p-4">
  <button class="!hidden">workaround for strange index</button>
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
