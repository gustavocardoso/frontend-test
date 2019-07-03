import Recipes from './recipes'
class App {
  constructor () {
    this.recipes = []
    this.recipesListContainer = document.querySelector('.list-container')
  }

  async init () {
    this.recipes = await Recipes.getRecipes()
    console.log(this.recipes)
    this.createRecipesList()
  }

  createRecipesList () {
    let list = document.createElement('ul')

    for (let [index, recipe] of this.recipes.entries()) {
      let item = document.createElement('li')
      let itemTitle = document.createElement('h2')
      let itemInfo = document.createElement('p')

      item.setAttribute('id', index)

      itemTitle.innerText = recipe.name
      item.appendChild(itemTitle)

      itemInfo.innerText = `Type: ${recipe.type} - Cook time: ${recipe.cook_time}`
      item.appendChild(itemInfo)

      list.appendChild(item)
    }

    this.showRecipes(list)
  }

  showRecipes (list) {
    this.recipesListContainer.appendChild(list)
  }
}

export default App
