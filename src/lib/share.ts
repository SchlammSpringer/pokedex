import type { Pokemon, PokeTypeRecord } from '$lib/types'
import classicImage from '$lib/assets/images/_gen/official-artwork'
import habitatImage from '$lib/assets/images/_gen/habitats'
import frontImage from '$lib/assets/images/_gen/front'
import backImage from '$lib/assets/images/_gen/back'
import shinyImage from '$lib/assets/images/_gen/shiny'
import shinyBackImage from '$lib/assets/images/_gen/shinyback'
import type { ImageSet as ImageSetType } from 'web-image-gen-svelte'

export const fillFromTypes = (types: string[], activate: boolean) =>
  Object.fromEntries(types.sort().map((type) => [type, activate]))

export const filterPokemon =
  (searchTerm: string, pokeType: PokeTypeRecord | undefined) => (pokemon: Pokemon) =>
    (pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.germanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.pokedex.toString().includes(searchTerm.toLowerCase())) &&
    pokemon.types.filter((type) => (pokeType ? pokeType[type] : false)).length > 0

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

type ClassicImage = typeof classicImage
export const getClassicSet = (pokedex: string): ImageSetType =>
  pokedex in classicImage ? classicImage[pokedex as keyof ClassicImage] : classicImage[10037]

type HabitatImage = typeof habitatImage
export const getHabitatSet = (habitat: string): ImageSetType =>
  habitat in habitatImage ? habitatImage[habitat as keyof HabitatImage] : habitatImage['cave']

type FrontImage = typeof frontImage
export const getFrontImage = (pokedex: string): ImageSetType =>
  pokedex in frontImage ? frontImage[pokedex as keyof FrontImage] : frontImage['egg']
  
type BackImage = typeof backImage
export const getBackImage = (pokedex: string): ImageSetType =>
  pokedex in backImage ? backImage[pokedex as keyof BackImage] : backImage['egg']

type ShinyImage = typeof shinyImage
export const getShinyImage = (pokedex: string): ImageSetType =>
  pokedex in shinyImage ? shinyImage[pokedex as keyof ShinyImage] : shinyImage['egg']

type ShinyBackImage = typeof shinyBackImage
export const getShinyBackImage = (pokedex: string): ImageSetType =>
  pokedex in shinyBackImage ? shinyBackImage[pokedex as keyof ShinyBackImage] : shinyBackImage['egg']