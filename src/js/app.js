import Recipes from './recipes'
class App {
  constructor () {
    this.recipes = []
    this.selectedRecipes = []
    this.ingredients = []
    this.ingredientsListContainer = document.querySelector('.ingredients')
    this.recipesListContainer = document.querySelector('.recipes')
  }

  async init () {
    this.recipes = await Recipes.getRecipes()
    this.createList()
  }

  createList () {
    let list = document.createElement('ul')
    list.setAttribute('class', 'recipes-list')

    for (let [index, recipe] of this.recipes.entries()) {
      let item = document.createElement('li')
      let itemTitle = document.createElement('h2')
      let itemInfo = document.createElement('p')

      item.setAttribute('id', `item-${index}`)
      item.setAttribute('data-selected', false)

      itemTitle.innerText = recipe.name
      item.appendChild(itemTitle)

      itemInfo.innerText = `Type: ${recipe.type} - Cook time: ${recipe.cook_time}`
      item.appendChild(itemInfo)

      list.appendChild(item)
    }

    this.showList(list)
    this.setEvents(list)
  }

  showList (list) {
    this.recipesListContainer.appendChild(list)
  }

  setEvents (list) {
    list.addEventListener('click', this.handleClickedItem.bind(this), false)
  }

  async handleClickedItem (e) {
    let parentId

    if (e.target.nodeName === 'H2' || e.target.nodeName === 'P') {
      parentId = e.srcElement.parentElement.id
    } else if (e.target.nodeName === 'LI') {
      parentId = e.srcElement.id
    }

    if (parentId !== undefined) {
      const selectedItem = document.querySelector(`#${parentId}`)
      const recipeId = parentId.replace('item-', '')
      let newStatus

      if (selectedItem.dataset.selected === 'false') {
        newStatus = true
        this.selectRecipe(recipeId)
      } else {
        newStatus = false
        this.deselectRecipe(recipeId)
      }

      console.log(this.selectedRecipes)

      selectedItem.setAttribute('data-selected', newStatus)
    }
  }

  selectRecipe (id) {
    this.selectedRecipes.push(id)
    this.generateIngredientsList()
  }

  deselectRecipe (id) {
    const index = this.selectedRecipes.indexOf(id)

    if (index > -1) {
      this.selectedRecipes.splice(index, 1)
      this.generateIngredientsList()
    }
  }

  async generateIngredientsList () {
    this.ingredients = []

    this.selectedRecipes.forEach(id => {
      let recipeIngredients = this.recipes[id].ingredients
      this.ingredients = [...this.ingredients, ...recipeIngredients].sort()
      this.ingredients = [...new Set(this.ingredients)]
    })

    this.showIngredientsList()
  }

  showIngredientsList () {
    this.removeIngredientsList()

    let list = document.createElement('ul')
    list.setAttribute('id', 'ingredients')
    list.setAttribute('class', 'ingredients-list')

    for (let ingredient of this.ingredients) {
      let item = document.createElement('li')

      item.innerText = ingredient
      list.appendChild(item)
    }

    this.ingredientsListContainer.appendChild(list)
  }

  removeIngredientsList () {
    const list = document.querySelector('#ingredients')

    if (list !== null) {
      list.remove()
    }
  }
}

export default App
