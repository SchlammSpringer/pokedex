import { getAllPokemons } from '$lib/queries'
import type { PageLoad } from './$types'

export const load = (async ({ fetch, parent }) => {
  const { queryClient } = await parent()
  await queryClient.prefetchQuery({
    queryKey: ['pokemons'],
    queryFn: () => getAllPokemons(fetch)
  })
}) satisfies PageLoad

// export const load = (async (event) => {
//   const response = await event.fetch('/api/pokemons', {
//     method: 'GET',
//     headers: {
//       'content-type': 'application/json'
//     }
//   })

//   return await response.json()
// }) satisfies PageLoad
