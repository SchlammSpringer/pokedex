export interface Pokemon extends PokemonShort {
  description: string
  types: string[]
  color: string
  germanName: string
  habitat: string
}

export interface PokemonShort {
  pokedex: number
  name: string
}

export interface Pokemons {
  pokemons: PokemonShort[]
}
