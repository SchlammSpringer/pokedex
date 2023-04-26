<script lang="ts">
  export let searchTerm = ''

  let timer: NodeJS.Timeout | string | number | undefined
  const debounce = ({ target }: Event) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      searchTerm = (target as HTMLInputElement).value
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
