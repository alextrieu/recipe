import React from 'react';
import Recipe from './Recipe';
import { RecipeContext } from './App'

export default function RecipeList({ recipes }) {
  const { handleAddRecipe } = React.useContext(RecipeContext)

  return (
    <div className='recipe-list'>
      <div>
        {recipes.map(recipe => {
          return (
            <Recipe
              key={recipe.id}
              {...recipe}
            />
          )
        })}
      </div>

      <div className='recipe-list__add-recipe-btn-container'>
        <button className='btn btn--primary' onClick={handleAddRecipe}>Add Recipe</button>
      </div>
      
    </div> // recipe-list 
  )
}