import type {
  Flavor,
  LanguageName,
  Pokemon,
  PokemonFromApi,
  SpeciesFromApi,
  Type
} from '$lib/types'

export const fetchPokemon = async (pokeUrl: URL) => {
  const pokemonResponse: Response = await fetch(pokeUrl, {
    headers: {
      Accept: 'application/json'
    }
  })
  const pokemonFromApi: PokemonFromApi = await pokemonResponse.json()
  const speciesResponse: Response = await fetch(pokemonFromApi.species.url, {
    headers: {
      Accept: 'application/json'
    }
  })
  const species: SpeciesFromApi = await speciesResponse.json()
  const pokemon: Pokemon = {
    pokedex: pokemonFromApi.id,
    name: pokemonFromApi.name,
    description: extractFlavorTexts(species).join('\n'),
    types: pokemonFromApi.types.map((type: Type) => type.type.name),
    color: species.color.name,
    germanName: species.names
      .filter((name: LanguageName) => name.language.name === 'de')
      .map((name: LanguageName) => name.name)
      .join('\n'),
    habitat: species.habitat.name
  }
  return pokemon
}

const extractFlavorTexts = ({ flavor_text_entries }: { flavor_text_entries: Flavor[] }) => {
  const allTexts = flavor_text_entries
    .filter((flavor: Flavor) => flavor.language.name === 'de')
    .map((flavor: Flavor) => flavor.flavor_text.replace(/[\r\n\f]/gm, ' '))
  return [...new Set(allTexts)]
}
