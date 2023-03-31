export const getAllPokemons = async (
  fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>
) => {
  const response = await fetch('/api/pokemons', {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })

  return await response.json()
}

export const getPokemon = async (
  fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
  name: string
) => {
  const response: Response = await fetch(`/api/pokemons/${name}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })

  return await response.json()
}