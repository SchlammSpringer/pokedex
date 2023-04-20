import type { Pokemon, PokeTypeRecord } from '$lib/types'

export const fillFromTypes = (types: string[], activate: boolean) =>
  Object.fromEntries(types.sort().map((type) => [type, activate]))

export const filterPokemon =
  (searchTerm: string, dictionary: PokeTypeRecord) => (pokemon: Pokemon) =>
    (pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.germanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.pokedex.toString().includes(searchTerm.toLowerCase())) &&
    pokemon.types.filter((type) => dictionary[type]).length > 0

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
