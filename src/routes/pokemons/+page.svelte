<script lang="ts">
  import type { Pokemons } from '$lib/types'
  import { spriteBackUrl, spriteUrl } from '$lib/share'
  import { page } from '$app/stores'
  import { createQuery } from '@tanstack/svelte-query'
  import { getAllPokemons } from '$lib/queries'
  import { ProgressBar } from '@skeletonlabs/skeleton'

  const url = $page.url

  const query = createQuery<Pokemons>({
    queryKey: ['pokemons'],
    queryFn: () => getAllPokemons(fetch)
  })

  let sprite: string[] = []
  const frontImage = (pokedex: number) => {
    const url = `${spriteUrl + pokedex}.png`
    sprite[pokedex] = url
    return url
  }

  const backImage = (pokedex: number) => {
    const url = `${spriteBackUrl + pokedex}.png`
    sprite[pokedex] = url
    return url
  }

  let searchTerm = url.searchParams.get('type') || ''

  $: pokemons =
    $query.data?.pokemons.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.pokedex.toString().includes(searchTerm.toLowerCase()) === true ||
        pokemon.types.map((type) => type.toLowerCase()).includes(searchTerm.toLowerCase())
    ) || []
</script>

<div class="container mx-auto p-8 space-y-8">
  <h1>Pokemons</h1>
  {#if $query.isLoading}
    <ProgressBar />
  {/if}
  {#if $query.isSuccess}
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
      <div class="input-group-shim"><i class="fa-solid fa-search" /></div>
      <input
        bind:value={searchTerm}
        autocomplete="false"
        type="search"
        placeholder="Search name, pokedex id or type"
      />
    </div>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {#each pokemons as pokemon}
        <div
          class="card overflow-hidden p-4 text-center"
          on:mouseover={() => backImage(pokemon.pokedex)}
          on:focus={() => backImage(pokemon.pokedex)}
          on:mouseout={() => frontImage(pokemon.pokedex)}
          on:blur={() => frontImage(pokemon.pokedex)}
        >
          <a href="/pokemons/{pokemon.name}" class="!no-underline">
            <header class="card-header">
              <h2 class="!text-xl first-letter:uppercase">{pokemon.name}</h2>
            </header>
            <section class="p-4">
              <img
                class="block bg-pink-50 ml-auto mr-auto rounded-full border border-gray-100 shadow-sm"
                src={sprite[pokemon.pokedex] || frontImage(pokemon.pokedex)}
                alt={pokemon.name}
              />
            </section>
          </a>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
</style>
