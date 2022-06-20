import React from 'react';
import RecipeList from './RecipeList';
import '../css/app.css';
import { v4 as uuidv4 } from 'uuid';
import RecipeEdit from './RecipeEdit';
export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.APP.recipes'

function App() {  
  const [recipes, setRecipes] = React.useState(sampleRecipes)
  const [selectedRecipeId, setSelectedRecipeId] = React.useState()

  const selectRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  React.useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes]);

  function handleSelectedRecipeId(id) {
    setSelectedRecipeId(id)
  }

  function handleAddRecipe() {
    const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        { id: uuidv4(), name: '', amount: '' }
      ]
    }

    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  const handleRecipeDelete = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)  
  }
  console.log(recipes[0] = {...recipes[0], name: 'hi'})

  const RecipeContextValue = {
    handleAddRecipe,
    handleRecipeDelete,
    handleSelectedRecipeId,
    handleRecipeChange
  }
  // assigning the var sampleRecipes to state will allow us to update the variable and 
  // re-render the changes to the component
  return (
    <RecipeContext.Provider value={RecipeContextValue}>
      <RecipeList recipes={recipes}/>
      {selectedRecipeId && <RecipeEdit recipe={selectRecipe} />}
    </RecipeContext.Provider>
  )
  
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '1:45',
    instructions: "1. Put salt on chicken\n2. Put chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 Pounds'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '2 Tbsp'
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Pork',
    servings: 5,
    cookTime: '0:45',
    instructions: "1. Put paprika on pork\n2. Put pork in oven\n3. Eat pork",
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '5 Pounds'
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '5 Tbsp'
      }
    ]
  }
]

export default App;