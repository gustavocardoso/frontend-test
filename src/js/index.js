;(() => {
  function App () {
    this.recipes = []
  }

  App.prototype = {
    init: async function () {
      console.log('App init')
      this.recipes = await this.getRecipes()
      console.log(this.recipes)
    },

    getRecipes: async function () {
      const response = await fetch('/public/assets/json/recipes.json')
      const recipes = await response.json()

      return recipes
    }
  }

  const app = new App().init()
})()
