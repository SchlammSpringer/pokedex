import type { RequestHandler } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'
import type { Pokemon } from '$lib/types'
import { fetchPokemon } from '$lib/server/share'
import { supabase } from '$lib/server/supabase'

const fetchOriginalPokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151', {
    headers: {
      Accept: 'application/json'
    }
  })
  return await response.json()
}

export const GET = (async () => {
  const { data } = await supabase.from('Pokemons').select('pokemon', { count: 'exact' }).order('id')
  if (data && data?.length !== 0) {
    const pokemons: Pokemon[] = data.map((pokemon) => pokemon.pokemon) satisfies Pokemon[]
    return json(pokemons, { headers: { 'Cache-Control': 's-maxage=86400' } })
  }
  const originalPokemons = await fetchOriginalPokemons()
  const maybePokemons: Promise<Pokemon>[] = originalPokemons.results.map(({ url }: { url: URL }) =>
    fetchPokemon(url)
  )
  const pokemons = await Promise.all(maybePokemons)
  pokemons.forEach(async (pokemon) => {
    const { data, error } = await supabase
      .from('Pokemons')
      .insert([{ id: pokemon.pokedex, pokemon: pokemon }])
  })
  return json(pokemons, { headers: { 'Cache-Control': 's-maxage=86400' } })
}) satisfies RequestHandler
