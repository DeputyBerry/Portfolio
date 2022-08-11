
// run renderMeal() function on click of the button with class of random
document.querySelector('.label').addEventListener('click', renderMeal)


const mealContainer = document.querySelector('.data')

async function getMeals() {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php'
   try {
    const res = await fetch(url)
    return await res.json()
   } catch (err){
    console.log(err)
   }
}

async function renderMeal() {
    const meal = await getMeals()
    // create a section for the meal
    const mealSection = document.createElement('section')
    // add class of recipe to mealSection
    mealSection.classList.add('recipe')
    // use the meal data to create a meal
    // for each ingredient in called meal, create an li
    mealSection.innerHTML = `
    <h2>${meal.meals[0].strMeal}</h2>
    <h4>Ingredients:</h4>
    <ul>
        <li>${meal.meals[0].strIngredient1} -
            <span>${meal.meals[0].strMeasure1}</span>
        </li>
        <li>${meal.meals[0].strIngredient2} - 
            <span>${meal.meals[0].strMeasure2}</span>
        </li>
        <li>${meal.meals[0].strIngredient3} - 
            <span>${meal.meals[0].strMeasure3}</span>
        </li>
        <li>${meal.meals[0].strIngredient4} - 
            <span>${meal.meals[0].strMeasure4}</span>
        </li>
        <li>${meal.meals[0].strIngredient5} - 
            <span>${meal.meals[0].strMeasure5}</span>
        </li>
        <li>${meal.meals[0].strIngredient6} - 
            <span>${meal.meals[0].strMeasure6}</span>
        </li>
        <li>${meal.meals[0].strIngredient7} - 
            <span>${meal.meals[0].strMeasure7}</span>
        </li>
        <li>${meal.meals[0].strIngredient8} - 
            <span>${meal.meals[0].strMeasure8}</span>
        </li>
        <li>${meal.meals[0].strIngredient9} - 
            <span>${meal.meals[0].strMeasure9}</span>
        </li>
        <li>${meal.meals[0].strIngredient10} -  
            <span>${meal.meals[0].strMeasure10}</span>
        </li>
        <li>${meal.meals[0].strIngredient11} -  
            <span>${meal.meals[0].strMeasure11}</span>
        </li>
        <li>${meal.meals[0].strIngredient12} -  
            <span>${meal.meals[0].strMeasure12}</span>
        </li>
        <li>${meal.meals[0].strIngredient13} -  
            <span>${meal.meals[0].strMeasure13}</span>
        </li>
        <li>${meal.meals[0].strIngredient14} -  
            <span>${meal.meals[0].strMeasure14}</span>
        </li>
        <li>${meal.meals[0].strIngredient15} -  
            <span>${meal.meals[0].strMeasure15}</span>
        </li>
        <li>${meal.meals[0].strIngredient16} -  
            <span>${meal.meals[0].strMeasure16}</span>
        </li>
        <li>${meal.meals[0].strIngredient17} -  
            <span>${meal.meals[0].strMeasure17}</span>
        </li>
        <li>${meal.meals[0].strIngredient18} -  
            <span>${meal.meals[0].strMeasure18}</span>
        </li>
        <li>${meal.meals[0].strIngredient19} -  
            <span>${meal.meals[0].strMeasure19}</span>
        </li>
        <li>${meal.meals[0].strIngredient20} -  
            <span>${meal.meals[0].strMeasure20}</span>
        </li>
    </ul>
    <h2>Instructions:</h2>
    <p>${meal.meals[0].strInstructions}</p>
    <iframe width="560" height="315" src="${meal.meals[0].strYoutube.replace(
        'watch?v=',
        'embed/'
    )}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `
    // if mealSection innerHTML already exists replace it with the new meal
    if (mealContainer.innerHTML !== '') {
        mealContainer.innerHTML = ''
        mealContainer.appendChild(mealSection)
    } else {
        mealContainer.appendChild(mealSection)
    }

    // for each li, and its children, add a class of ingredient
    const ingredients = document.querySelectorAll('li')
    ingredients.forEach(ingredient => {
        ingredient.classList.add('ingredient')
    })
    // for each span, and its children, add a class of measure
    const measures = document.querySelectorAll('span')
    measures.forEach(measure => {
        measure.classList.add('measure')
    })

    // if the innertext of the class ingredient is empty, remove the li
    const emptyIngredients = document.querySelectorAll('.ingredient')
    emptyIngredients.forEach(ingredient => {
        if (ingredient.innerText === '-'){
            ingredient.remove()
        }
        
    })

    // append img to img tag
    const img = document.querySelector('img')
    img.src = meal.meals[0].strMealThumb
    img.alt = meal.meals[0].strMeal

    // remove the class food from img
    img.classList.remove('food')
    

}
