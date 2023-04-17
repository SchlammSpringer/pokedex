import { describe, expect, it, vi, type MockedObject } from 'vitest'
import {
  findPokemonByName,
  insertPokemon as insertPokemon,
  selectAllPokemons,
  updatePokemon
} from './db-queries'
import { supabase } from './supabase'

vi.mock('./supabase')
const supabaseMock = supabase as MockedObject<any>
const pokemon = {
  pokedex: 1,
  name: 'bulbasaur',
  description: 'Dieses Pokémon',
  types: ['grass', 'poison'],
  color: 'green',
  germanName: 'Bisasam',
  habitat: 'grassland'
}

const mockSelect = vi.fn().mockReturnThis()
const mockOrder = vi.fn().mockReturnThis()
const mockInsert = vi.fn().mockReturnThis()
const mockUpdate = vi.fn().mockReturnThis()
const mockEq = vi.fn().mockReturnThis()
const mockFrom = vi.fn(() => ({
  select: mockSelect,
  order: mockOrder,
  insert: mockInsert,
  update: mockUpdate,
  eq: mockEq
}))
vi.spyOn(supabaseMock, 'from').mockImplementation(mockFrom)
describe('check correct call of all DB queries', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('select all pokemons', () => {
    selectAllPokemons()

    expect(mockFrom).toHaveBeenNthCalledWith(1, 'Pokemons')
    expect(mockSelect).toHaveBeenNthCalledWith(1, 'pokemon', { count: 'exact' })
    expect(mockOrder).toHaveBeenNthCalledWith(1, 'id')
  })

  it('insert all pokemons', () => {
    insertPokemon(pokemon)

    expect(mockFrom).toHaveBeenNthCalledWith(1, 'Pokemons')
    expect(mockInsert).toHaveBeenNthCalledWith(1, [{ id: pokemon.pokedex, pokemon: pokemon }])
  })

  it('find pokemon by name', () => {
    findPokemonByName('bulbasaur')

    expect(mockFrom).toHaveBeenNthCalledWith(1, 'Pokemons')
    expect(mockSelect).toHaveBeenNthCalledWith(1, 'pokemon')
    expect(mockEq).toHaveBeenNthCalledWith(1, 'pokemon->>name', 'bulbasaur')
  })
  it('update pokemon', () => {
    const updatedPokemon = { ...pokemon, notes: 'abc' }

    updatePokemon(updatedPokemon)

    expect(mockFrom).toHaveBeenNthCalledWith(1, 'Pokemons')
    expect(mockUpdate).toHaveBeenNthCalledWith(1, { pokemon: updatedPokemon })
    expect(mockEq).toHaveBeenNthCalledWith(1, 'id', updatedPokemon.pokedex)
    expect(mockSelect).toHaveBeenCalledOnce()
  })
})
