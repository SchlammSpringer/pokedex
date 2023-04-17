import type { PageServerLoad } from './$types'

export const load: PageServerLoad = ({ url }) => ({
  pathname: url.pathname
})
