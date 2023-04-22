import type {
  BasePokemonInformations,
  Flavor,
  LanguageName,
  Pokemon,
  PokemonFromApi,
  SpeciesFromApi,
  Type
} from '$lib/types'
import { error as svelteError } from '@sveltejs/kit'
import { uniq } from 'fp-ts/lib/Array'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import * as S from 'fp-ts/lib/string'

export const fetchAPI = <A>(url: URL) =>
  pipe(
    TE.tryCatch<Error, Response>(
      () =>
        fetch(url, {
          headers: {
            Accept: 'application/json'
          }
        }),
      (reason) => new Error(String(reason))
    ),
    TE.filterOrElse(
      (response) => response.ok,
      (response) => new Error(response.statusText)
    ),
    TE.chain((resp) =>
      TE.tryCatch<Error, A>(
        () => resp.json(),
        () => new Error('Failed to read json from response')
      )
    )
  )

export const getAllPokemons = pipe(
  new URL('https://pokeapi.co/api/v2/pokemon?limit=151'),
  fetchAPI<BasePokemonInformations>
)

export const fetchPokemon: (pokeUrl: URL) => Promise<Pokemon> = async (pokeUrl: URL) => {
  try {
    const allResultInEither = await getAllPokemonStuff(pokeUrl)()
    return pipe(
      allResultInEither,
      E.match(
        (error) => {
          console.error(error)
          throw svelteError(400, `fetch from poke api: ${JSON.stringify(error, null, 2)}`)
        },
        (result) => {
          const types = result.pokemonFromApi.types.map((type: Type) => type.type.name)
          return {
            pokedex: result.pokemonFromApi.id,
            name: result.pokemonFromApi.name,
            description: extractFlavorTexts(result.species).join('\n'),
            types: types.length > 0 ? (types as [string, ...string[]]) : ['somethingstrange'],
            color: result.species.color.name,
            germanName: result.species.names
              .filter((name: LanguageName) => name.language.name === 'de')
              .map((name: LanguageName) => name.name)
              .join('\n'),
            habitat: result.species.habitat.name
          } satisfies Pokemon
        }
      )
    )
  } catch (error) {
    console.error(error)
    throw svelteError(400, `something strange: ${JSON.stringify(error, null, 2)}`)
  }
}
export const getAllPokemonStuff = (pokeUrl: URL) =>
  pipe(
    TE.Do,
    TE.apS('pokemonFromApi', fetchAPI<PokemonFromApi>(pokeUrl)),
    TE.bind('species', (resultObj) => {
      const speciesUrl = resultObj.pokemonFromApi.species.url as URL
      return pipe(speciesUrl, fetchAPI<SpeciesFromApi>)
    })
  )

const extractFlavorTexts = ({ flavor_text_entries }: { flavor_text_entries: Flavor[] }) => {
  const allTexts = flavor_text_entries
    .filter((flavor: Flavor) => flavor.language.name === 'de')
    .map((flavor: Flavor) => flavor.flavor_text.replace(/[\r\n\f]/gm, ' '))
  return uniq(S.Eq)(allTexts)
}
