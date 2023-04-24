import { expect, test } from '@playwright/test'

test('workflow', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Educational poject with SvelteKit & PokeAPI' })
  ).toBeVisible()

  const navigation = page.getByRole('navigation')
  expect(navigation).toBeVisible()

  navigation.getByRole('link', { name: 'Pokemons' }).click()

  await expect(page).toHaveURL(/\/pokemons/)
  await expect(page.getByRole('heading', { name: 'Pokemons' })).toBeVisible()

  await page.getByRole('searchbox').fill('pika')

  await page.getByRole('link', { name: 'show details for pikachu' }).click()

  await expect(page).toHaveURL(/\/pokemons\/pikachu/)

  await expect(page.getByRole('heading', { level: 1, name: 'pikachu' })).toBeVisible()

  // await expect(page.getByRole('heading', { level: 2, name: 'Pikachu' })).toBeVisible()

  await page.getByRole('link', { name: 'electric' }).click()

  await expect(page).toHaveURL(/\/pokemons\?type=electric/)
})
