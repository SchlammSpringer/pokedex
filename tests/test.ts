import { expect, test } from '@playwright/test'

test('workflow', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Hello Pokedex' })).toBeVisible()
  const navigation = await page.getByRole('navigation')
  expect(navigation).toBeVisible()
  navigation.getByRole('link', { name: 'Pokemons' }).click()
  await await expect(page).toHaveURL(/\/pokemons/)
  await expect(page.getByRole('heading', { name: 'Pokemons' })).toBeVisible()
})
