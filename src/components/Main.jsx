import React from "react";
import IngredientsList from "./IngredientsList";
import MistralRecipe from "./MistralRecipe";
import { getRecipeFromMistral } from "../ai";

export default function Main() {
    const [ingredients, setIngredients] = React.useState([
        "all the main spices",
        "pasta",
        "ground beef",
        "tomato paste",
    ]);
    const [recipe, setRecipe] = React.useState("");
    const recipeSection = React.useRef(null);

    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            const yCoord =
                recipeSection.current.getBoundingClientRect().top + window.scrollY;
            window.scroll({
                top: yCoord,
                behavior: "smooth",
            });
        }
    }, [recipe]);

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients);
        setRecipe(recipeMarkdown);
    }

    function addIngredient(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const formData = new FormData(event.target);
        const newIngredient = formData.get("ingredient");
        if (newIngredient.trim() !== "") {
            setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
        }
        event.target.reset(); // Clear the input field after adding the ingredient
    }

    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano (min 3)"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button type="submit">Add ingredient</button>
            </form>

            {ingredients.length > 0 && (
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    setIngredients={setIngredients}
                    getRecipe={getRecipe}
                />
            )}

            {recipe && <MistralRecipe recipe={recipe} />}
        </main>
    );
}