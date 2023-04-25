<script lang="ts">

  export let searchTerm = ''

  let timer
  const debounce = e => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      searchTerm = e.target.value
    }, 350)
  }

</script>

<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
  <div class="input-group-shim">🔍</div>
  <input
    on:input={debounce}
    autocomplete="false"
    type="search"
    placeholder="Search name, german name or pokedex id"
  />
</div>

<style>
</style>

