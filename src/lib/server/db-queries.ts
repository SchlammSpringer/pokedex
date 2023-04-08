import type { Pokemon } from '$lib/types'
import { supabase } from './supabase'

export const selectAllPokemons = () =>
  supabase.from('Pokemons').select('pokemon', { count: 'exact' }).order('id')

export const insertAllPokemons = (pokemon: Pokemon) =>
  supabase.from('Pokemons').insert([{ id: pokemon.pokedex, pokemon: pokemon }])

export const findPokemonByName = (name: string) =>
  supabase.from('Pokemons').select('pokemon').eq('pokemon->>name', name)

export const updatePokemon = (pokemon: Pokemon) =>
  supabase.from('Pokemons').update({ pokemon: pokemon }).eq('id', pokemon.pokedex).select()
