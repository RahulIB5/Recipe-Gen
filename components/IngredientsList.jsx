export default function IngredientsList(props) {
    function removeIngredient(ingredientToRemove) {
        const updatedIngredients = props.ingredients.filter(
            ingredient => ingredient !== ingredientToRemove
        );
        props.setIngredients(updatedIngredients); 
    }

    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>
            {ingredient}
            <button
                className="remove-button"
                onClick={() => removeIngredient(ingredient)}
                aria-label={`Remove ${ingredient}`}
            >
                X
            </button>
        </li>
    ));

    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">
                {ingredientsListItems}
            </ul>
            {props.ingredients.length > 2 && (
                <div className="get-recipe-container">
                    <div ref={props.ref}>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.getRecipe}>Get a recipe</button>
                </div>
            )}
        </section>
    );
}