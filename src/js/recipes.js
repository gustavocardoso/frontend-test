class Recipes {
  constructor () {
    // this.recipes = []
  }

  async init () {
    console.log('App init')
    this.recipes = await this.getRecipes()
    console.log(this.recipes)
  }

  async getRecipes () {
    const response = await fetch('/public/assets/json/recipes.json')
    const recipes = await response.json()

    return recipes
  }
}

export default new Recipes()
