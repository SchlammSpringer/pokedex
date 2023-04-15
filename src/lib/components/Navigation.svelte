<script lang="ts">
  import NavigationLink from './NavigationLink.svelte'
  export let currentPath: string
</script>

<nav class="list-nav p-4">
  <button class="!hidden">workaround for strange index</button>
  <ul>
    <li>
      <NavigationLink href="/" {currentPath}>Home</NavigationLink>
    </li>
    <li>
      <NavigationLink href="/pokemons" {currentPath}>Pokemons</NavigationLink>
      {#if currentPath.split('/').length === 3}
        <ul>
          <li class="pl-8 py-1">
            <NavigationLink href={currentPath} {currentPath}>
              <span class="first-letter:uppercase">
                {currentPath.split('/')[2]}
              </span>
            </NavigationLink>
          </li>
        </ul>
      {/if}
    </li>
    <li>
      <NavigationLink href="/about" {currentPath}>About</NavigationLink>
    </li>
  </ul>
</nav>
