import Recipes from './recipes'
import '../sass/app.scss'
class App {
  constructor () {
    this.recipes = []
    this.selectedRecipes = []
    this.ingredients = []
    this.ingredientsListContainer = document.querySelector('.ingredients')
    this.recipesListContainer = document.querySelector('.recipes')
    this.ingredientsCounter = document.querySelector('.ingredients-counter')
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
      let itemContainer = document.createElement('div')

      itemTitle.setAttribute('class', 'item-title')
      itemInfo.setAttribute('class', 'item-meta')
      itemContainer.setAttribute('class', 'item-container')

      item.setAttribute('id', `item-${index}`)
      item.setAttribute('class', 'item')
      item.setAttribute('data-selected', false)

      itemTitle.innerHTML = recipe.name
      itemContainer.appendChild(itemTitle)

      itemInfo.innerHTML = `Type: ${recipe.type} <span>Cook time: ${
        recipe.cook_time
      }</span>`
      itemContainer.appendChild(itemInfo)

      item.appendChild(itemContainer)

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

    if (
      e.target.nodeName === 'H2' ||
      e.target.nodeName === 'P' ||
      e.target.nodeName === 'DIV'
    ) {
      parentId = e.srcElement.parentElement.parentElement.id
    } else if (e.target.nodeName === 'SPAN') {
      parentId = e.srcElement.parentElement.parentElement.parentElement.id
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

    if (this.ingredients.length > 0) {
      let list = document.createElement('ul')
      list.setAttribute('id', 'ingredients')
      list.setAttribute('class', 'ingredients-list')

      for (let ingredient of this.ingredients) {
        let item = document.createElement('li')

        item.setAttribute('class', 'ingredient')
        item.innerHTML = `<span>${ingredient}</span>`
        list.appendChild(item)
      }

      this.ingredientsListContainer.appendChild(list)
      this.ingredientsCounter.innerHTML = `(${this.ingredients.length})`
    }
  }

  removeIngredientsList () {
    const list = document.querySelector('.ingredients-list')

    if (list !== null) {
      list.remove()
    }
  }
}

export default App
