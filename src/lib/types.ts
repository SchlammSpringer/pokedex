import { z } from 'zod'

export interface Pokemon {
  pokedex: number
  name: string
  types: string[]
  description: string
  color: string
  germanName: string
  habitat: string
  notes?: string
}

export interface Pokemons {
  pokemons: Pokemon[]
}

export interface PokemonFromApi {
  types: Type[]
  id: number
  species: SpeciesFromApi
  name: string
}

export interface SpeciesFromApi {
  url: URL | RequestInfo
  habitat: Name
  names: LanguageName[]
  color: Name
  flavor_text_entries: Flavor[]
}

export interface Name {
  name: string
}

export interface LanguageName {
  name: string
  language: Name
}

export interface Flavor {
  flavor_text: string
  language: Name
}

export interface Type {
  type: Name
}

export interface PokeTypeRecord {
  [p: string]: string | boolean
}

export const schema = z.object({
  pokedex: z.number().positive(),
  name: z.string().min(1),
  types: z.array(z.string().min(1)),
  description: z.string().min(1),
  color: z.string().min(1),
  germanName: z.string().min(1),
  habitat: z.string().min(1),
  notes: z.string().min(5).max(1000).optional()
})
