import type { RequestHandler } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'
import type { Pokemon } from '$lib/types'

const extractFlavorTexts = ({ flavor_text_entries }: { flavor_text_entries: Flavor[] }) => {
  const allTexts = flavor_text_entries
    .filter((flavor: Flavor) => flavor.language.name === 'de')
    .map((flavor: Flavor) => flavor.flavor_text.replace(/[\r\n\f]/gm, ' '))
  return [...new Set(allTexts)]
}

export const GET = (async ({ params }) => {
  const pokemonResponse: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
  const pokemonFromApi = await pokemonResponse.json()
  const speciesResponse: Response = await fetch(pokemonFromApi.species.url)
  const species = await speciesResponse.json()
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
  return json(pokemon)
}) satisfies RequestHandler

interface Name {
  name: string
}

interface LanguageName {
  name: string
  language: Name
}

interface Flavor {
  flavor_text: string
  language: Name
}

interface Type {
  type: Name
}
