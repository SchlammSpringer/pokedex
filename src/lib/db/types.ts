import type { Pokemon } from '$lib/types'

export interface Database {
  public: {
    Tables: {
      Pokemons: {
        Row: {
          id: number
          pokemon: Pokemon | null
        }
        Insert: {
          id?: number
          pokemon?: Pokemon | null
        }
        Update: {
          id?: number
          pokemon?: Pokemon | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
