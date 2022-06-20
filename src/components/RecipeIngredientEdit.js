import React from 'react'

export default function RecipeIngredientEdit({ ingredient, handleIngredientChange, handleIngredientDelete }) {
    
  function handleChange(changes) {
      handleIngredientChange(ingredient.id, {...ingredient, ...changes})
  }
  return (
    <>
        <input 
            type="text"
            value={ingredient.name}
            onInput={(e) => handleChange({name: e.target.value})}
        />
        <input 
            type="text"
            value={ingredient.amount}
            onInput={(e) => handleChange({amount: e.target.value})}
        />
        <button onClick={() => handleIngredientDelete(ingredient.id)}>&times;</button>
    </>
  )
}
