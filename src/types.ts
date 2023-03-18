export interface Pokemon {
  name: string
  description: string
  types: string[]
  germanName: string
}

export interface PokemonShort {
  pokedex: string
  name: string
}
export interface Pokemons {
  pokemons: PokemonShort[]
}
