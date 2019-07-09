class Recipes {
  async getRecipes () {
    const response = await fetch('/public/assets/json/recipes.json')
    const recipes = await response.json()

    return recipes
  }
}

export default new Recipes()
