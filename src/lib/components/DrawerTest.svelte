<script>
  import { drawerStore } from "@skeletonlabs/skeleton"
  import PokedexDrawer from "./PokedexDrawer.svelte"

</script>

<button on:click={() => drawerStore.open()}>
    <PokedexDrawer currentPath='/' ></PokedexDrawer>
</button>