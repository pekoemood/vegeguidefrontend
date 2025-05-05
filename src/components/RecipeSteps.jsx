const RecipeSteps = ({steps}) => {
  return (
    <section className="w-full mt-6">
      <h2 className="text-xl">調理手順</h2>
      <ul className="steps steps-vertical mt-6">
        {steps.map((step) => (
          <li key={step.step_number} className="step">{step.description}</li>
        ))}
      </ul>
    </section>
  )
}

export default RecipeSteps;