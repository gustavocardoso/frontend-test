class Recipes {
  async getRecipes () {
    const response = await fetch('/public/assets/json/recipes.json')
    const recipes = await response.json()

    return recipes
  }

  async getRecipeIngredients (recipeIndex) {
    const recipes = await this.getRecipes()
    return recipes[recipeIndex].ingredients
  }
}

export default new Recipes()
