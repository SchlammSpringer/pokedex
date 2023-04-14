import type { Breakpoints, BreakpointKeys, Pokemon, PokeTypeRecord, WpImage } from '$lib/types'

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

export const vercelImgRemap = (
  sourceUrl: string,
  size: number,
  breakpoint: number,
  breakSizes: number[],
  quality: number
) =>
  `/_vercel/image?url=${encodeURIComponent(sourceUrl)}&w=${size}&q=${quality} ${
    breakSizes[breakpoint]
  }w`

export const toVercelRemappedSrcSet = (
  imageSizes: number[],
  breakSizes: number[],
  quality: number,
  image: WpImage
) =>
  imageSizes
    .map((size, index) => vercelImgRemap(image?.sourceUrl, size, index, breakSizes, quality))
    .join(',')

export const vercelImg = (sourceUrl: string, size: number, quality: number) =>
  `/_vercel/image?url=${encodeURIComponent(sourceUrl)}&w=${size}&q=${quality} ${size}w`

export const toVercelSrcSet = (imageSizes: number[], quality: number, image: WpImage) =>
  imageSizes.map((size) => vercelImg(image?.sourceUrl, size, quality)).join(',')

export const capitalizeFirstLetter = (str: string) => {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1)
  return capitalized
}
