import { getPokemon } from '$lib/queries'
import type { PageLoad } from './$types'

// export const load = (async (event) => {
//   return getPokemon(event.fetch, event.params.name)
// }) satisfies PageLoad

export const load = (async ({ fetch, params, parent }) => {
  const { queryClient } = await parent()
  const query = await queryClient.prefetchQuery({
    queryKey: ['pokemon', params.name],
    queryFn: () => getPokemon(fetch, params.name)
  })

  return {
    name: params.name,
    queryClient: queryClient,
    query: query
  }
}) satisfies PageLoad
