import type { RequestHandler } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'
import type { Pokemon } from '../../../../types'

export const GET = (async ({ params }) => {
  const pokemonResponse: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
  const pokemonFromApi = await pokemonResponse.json()
  const speciesResponse: Response = await fetch(pokemonFromApi.species.url)
  const species = await speciesResponse.json()
  const pokemon: Pokemon = {
    name: pokemonFromApi.name,
    description: species.flavor_text_entries[0].flavor_text,
    types: pokemonFromApi.types,
    germanName: species.names
      .filter((name: Name) => name.language.name === 'de')
      .map((name: Name) => name.name)[0]
  }
  console.log(pokemon)
  return json(pokemon)
}) satisfies RequestHandler

interface Language {
  name: string
}

interface Name {
  name: string
  language: Language
}
