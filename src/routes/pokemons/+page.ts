import { getAllPokemons } from '$lib/share'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch, parent }) => {
  const { queryClient } = await parent()
  await queryClient.prefetchQuery({
    queryKey: ['pokemons'],
    queryFn: () => getAllPokemons(fetch)
  })
}
