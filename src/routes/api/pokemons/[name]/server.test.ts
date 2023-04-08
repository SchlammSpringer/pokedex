import { describe, it } from 'vitest'
import { GET } from './+server'

describe('single Pokemon API', () => {
  describe('GET', () => {
    it('sucess', async () => {})
    it('error', async () => {
      const response = await GET({
        params: {
          name: 'charmander'
        }
      })
      console.log(response)
    })
  })
  describe('PUT', () => {
    it('sucess', async () => {
      // PUT({'name': 'Shitty-Charmander'} )
    })
    it('error', async () => {
      // PUT({'name': 'Shitty-Charmander'} )
    })
  })
})
