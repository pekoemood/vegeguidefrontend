const Ingredients = ({servings, ingredients}) => {

  return (
    <section className="w-full mt-6">
      <h2 className="text-xl">材料（{servings}人前）</h2>
      <ul className="mt-6 mx-auto space-y-4">
        {ingredients.map((ingredient) => (
          <li key={ingredient.name} className="flex justify-between items-center py-2 border-b border-neutral-400">
            <span className="text-xl">{ingredient.name} </span>
            <span className="text-neutral-500 text-lg">{ingredient.amount} {ingredient.unit}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Ingredients;