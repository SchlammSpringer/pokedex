import backImage from '$lib/assets/images/_gen/back'
import frontImage from '$lib/assets/images/_gen/front'
import habitatImage from '$lib/assets/images/_gen/habitats'
import classicImage from '$lib/assets/images/_gen/official-artwork'
import shinyImage from '$lib/assets/images/_gen/shiny'
import shinyBackImage from '$lib/assets/images/_gen/shinyback'
import { range } from 'fp-ts/NonEmptyArray'
import { describe, expect, it } from 'vitest'
import {
  getBackImage,
  getClassicSet,
  getFrontImage,
  getHabitatSet,
  getShinyBackImage,
  getShinyImage
} from './share'

describe('test image selecting', () => {
  describe('classic offical image', () => {
    it('all images present', () => {
      const pokedex = range(1, 151)
        .concat(10037)
        .map((it) => it.toString())

      const setSize = Object.keys(classicImage)

      expect(setSize).toEqual(pokedex)
    })
    it('find image in set', () => {
      const image = getClassicSet('1')

      expect(image).matchSnapshot()
    })
    it('default image if not in set', () => {
      const image = getClassicSet('abc')

      expect(image).toEqual(classicImage[10037])
    })
  })

  describe('habitat image', () => {
    it('all images present', () => {
      const habitat = [
        'cave',
        'forest',
        'grassland',
        'mountain',
        'rare',
        'rough-terrain',
        'sea',
        'urban',
        'waters-edge'
      ]

      const setSize = Object.keys(habitatImage)

      expect(setSize).toEqual(habitat)
    })
    it('find image in set', () => {
      const image = getHabitatSet('cave')

      expect(image).matchSnapshot()
    })
    it('default image if not in set', () => {
      const image = getHabitatSet('abc')

      expect(image).toEqual(getHabitatSet('cave'))
    })
  })

  describe('sprite image', () => {
    it('all images present', () => {
      const pokedex = range(1, 151)
        .map((it) => it.toString())
        .concat('egg')

      const frontSetSize = Object.keys(frontImage)
      const backSetSize = Object.keys(backImage)
      const shinySetSize = Object.keys(shinyImage)
      const shinyBackSetSize = Object.keys(shinyBackImage)

      expect(frontSetSize).toEqual(pokedex)
      expect(backSetSize).toEqual(pokedex)
      expect(shinySetSize).toEqual(pokedex)
      expect(shinyBackSetSize).toEqual(pokedex)
    })
    it('find image in set', () => {
      const frontalImage = getFrontImage('1')
      const backImage = getBackImage('1')
      const shinyImage = getShinyImage('1')
      const shinyBackImage = getShinyBackImage('1')

      expect(frontalImage).matchSnapshot()
      expect(backImage).matchSnapshot()
      expect(shinyImage).matchSnapshot()
      expect(shinyBackImage).matchSnapshot()
    })
    it('default image if not in set', () => {
      const front = getFrontImage('abc')
      const back = getBackImage('abc')
      const shiny = getShinyImage('abc')
      const shinyBack = getShinyBackImage('abc')

      expect(front).toEqual(frontImage['egg'])
      expect(back).toEqual(backImage['egg'])
      expect(shiny).toEqual(shinyImage['egg'])
      expect(shinyBack).toEqual(shinyBackImage['egg'])
    })
  })
})
