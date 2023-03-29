<script lang='ts' ✂prettier:content✂="CiAgaW1wb3J0IHR5cGUgeyBQb2tlbW9ucywgUG9rZW1vblNob3J0IH0gZnJvbSAnJGxpYi90eXBlcycKICBpbXBvcnQgeyBzcHJpdGVCYWNrVXJsLCBzcHJpdGVVcmwgfSBmcm9tICckbGliL3NoYXJlJwoKICBleHBvcnQgbGV0IGRhdGE6IFBva2Vtb25zCiAgbGV0IHBva2Vtb25zOiBQb2tlbW9uU2hvcnRbXQoKICBsZXQgc3ByaXRlOiBzdHJpbmdbXSA9IFtdCiAgY29uc3QgZnJvbnRJbWFnZSA9IChwb2tlZGV4OiBudW1iZXIpID0+IHsKICAgIGNvbnN0IHVybCA9IGAke3Nwcml0ZVVybCArIHBva2VkZXh9LnBuZ2AKICAgIHNwcml0ZVtwb2tlZGV4XSA9IHVybAogICAgcmV0dXJuIHVybAogIH0KCiAgY29uc3QgYmFja0ltYWdlID0gKHBva2VkZXg6IG51bWJlcikgPT4gewogICAgY29uc3QgdXJsID0gYCR7c3ByaXRlQmFja1VybCArIHBva2VkZXh9LnBuZ2AKICAgIHNwcml0ZVtwb2tlZGV4XSA9IHVybAogICAgcmV0dXJuIHVybAogIH0KCiAgbGV0IHNlYXJjaFRlcm0gPSAnJwogICQ6IHBva2Vtb25zID0gZGF0YS5wb2tlbW9ucy5maWx0ZXIoCiAgICAocG9rZW1vbikgPT4KICAgICAgcG9rZW1vbi5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpKSB8fAogICAgICBwb2tlbW9uLnBva2VkZXgudG9TdHJpbmcoKS5pbmNsdWRlcyhzZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkpID09PSB0cnVlCiAgKQo=">{}</script>

<div class="container mx-auto p-8 space-y-8">
  <h1>Pokemons</h1>
  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
    <div class="input-group-shim"><i class="fa-solid fa-search" /></div>
    <input
      bind:value={searchTerm}
      autocomplete="false"
      type="search"
      placeholder="Search name or pokedex id"
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
</div>

<style ✂prettier:content✂="Cg=="></style>