export const load = ({ url, params }) => {
  const { pathname } = url

  return {
    pathname,
    params
  }
}
