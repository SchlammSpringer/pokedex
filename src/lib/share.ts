import type { Pokemon, PokeTypeRecord } from './types'

export const spriteUrl = '/assets/sprites/'
export const spriteBackUrl = '/assets/sprites/back/'
export const spriteShinyUrl = '/assets/sprites/shiny/'
export const spriteShinyBackUrl = '/assets/sprites/back/shiny/'

export const officialArtworkUrl = '/assets/official-artwork/'
export const officialShinyArtworkUrl = '/assets/official-artwork/shiny/'

export const fillFromTypes = (types: string[], activate: boolean) =>
  Object.fromEntries(types.sort().map((type) => [type, activate]))

export const filterPokemon =
  (searchTerm: string, dictionary: PokeTypeRecord) => (pokemon: Pokemon) =>
    (pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.germanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.pokedex.toString().includes(searchTerm.toLowerCase())) &&
    pokemon.types.filter((type) => dictionary[type]).length > 0
