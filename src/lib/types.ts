export interface Pokemon extends PokemonShort {
  description: string
  color: string
  germanName: string
  habitat: string
}

export interface Pokemons {
  pokemons: Pokemon[]
}

interface PokemonShort {
  pokedex: number
  name: string
  types: string[]
}

export interface PokemonFromApi {
  types: Type[]
  id: number
  species: SpeciesFromApi
  url: string
  name: string
}

export interface SpeciesFromApi {
  url: URL | RequestInfo
  habitat: any
  names: LanguageName[]
  color: any
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
