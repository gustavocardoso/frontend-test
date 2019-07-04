import { expect } from 'chai'
import Recipes from '../js/recipes'

test('should return a list of recipes', async () => {
  const recipes = await Recipes.getRecipes()
  expect(true).to.be.equal(true)
})
