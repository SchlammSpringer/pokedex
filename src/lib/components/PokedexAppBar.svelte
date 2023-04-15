<script lang="ts">
  import { AppBar, drawerStore } from '@skeletonlabs/skeleton'

  export const drawerOpen = () => drawerStore.open({})
</script>

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
