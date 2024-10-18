$(document).ready(function () {
    function MealTagBadges(tag) {
        return `
            <p class="badge text-bg-dark">${tag}</p>
        `
    }

    function IngredientList(ingredient) {
        return `
            <li>${ingredient}</li>
        `
    }

    const urlParams = new URLSearchParams(window.location.search)
    const detailMeal = JSON.parse(localStorage.getItem('detailMeal'));

    const mealId = urlParams.get('mealId')
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`

    let meal = []

    $('.main-content').hide()
    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function (data) {
            $('#loadingContent').html('')
            $('.main-content').show()
            meal = data.meals[0]

            tags = meal.strTags ? meal.strTags.split(',') : ['tag not found']

            tagsHtml = tags.map((tag) => MealTagBadges(tag)).join('')

            $('#strMeal').html(`${meal.strMeal} Recipe`)
            $('#strTags').html(tagsHtml)
            $('#strMealThumb').attr('src', meal.strMealThumb).attr('alt', `${meal.strMeal} image`)
            $('#strInstructions').html(meal.strInstructions)
            $('#strYoutube').attr('src', meal.strYoutube.replace('watch?v=', 'embed/'))
            console.log(meal.strYoutube.replace('watch?v=', 'embed/'));


            meal = Object.entries(meal)

            const mealIngredient = meal.filter(([key, value]) => key.startsWith('strIngredient') && value).map(([key, value]) => value)
            const mealMeasurement = meal.filter(([key, value]) => key.startsWith('strMeasure') && value).map(([key, value]) => value)

            const ingredientWithMeasurement = mealIngredient.map((ingredient, index) => {
                const measurement = mealMeasurement[index] || '';
                return `${measurement} ${ingredient}`.trim();
            });

            const ingredientsList = ingredientWithMeasurement.map((ingredient) => IngredientList(ingredient)).join('')

            $('#strIngredients').html(ingredientsList)
        }
    })
})