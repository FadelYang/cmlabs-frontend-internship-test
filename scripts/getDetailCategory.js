$(document).ready(function () {
    function MealCard(meal) {
        return `
                <div class="card col-4 p-3" style="width: 18rem;">
                  <img src="${meal.strMealThumb}" class="card-img-top" alt="..." style="height: 262px;">
                  <div class="card-body text-center d-flex flex-column justify-content-between gap-3">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <div>
                        <a href="#" class="btn btn-dark meals-recipe-link" data-name="${meal.idMeal}">Check Recipe</a>
                    </div>
                  </div>
                </div>
            `
    }

    const urlParams = new URLSearchParams(window.location.search)

    const selectedCategoryData = JSON.parse(localStorage.getItem('selectedCategoryData'));

    // Breadcrumb
    $('#categoryBreadcrumb').html(selectedCategoryData.strCategory)

    localStorage.setItem('selectedCategoryData', JSON.stringify(selectedCategoryData))

    $('#categoryThumb').attr('src', selectedCategoryData.strCategoryThumb).attr('alt', `${selectedCategoryData.strCategory} meals image`)
    $('.category-name').html(selectedCategoryData.strCategory)
    $('#categoryDescription').html(selectedCategoryData.strCategoryDescription)

    const categoryName = urlParams.get('categoryName')

    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`

    let meals = []

    $('#categoryMealsContainer').html('load meal data')
    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function (data) {
            meals = data.meals

            const cards = meals.map((meal) => MealCard(meal)).join('')

            $('#categoryMealsContainer').html(cards)

        },
        error: function () {
            console.log('error get meals item');
        }
    })


    // get detail recipe
    $(document).on('click', '.meals-recipe-link', function (e) {
        e.preventDefault();

        const mealId = $(this).data('name')

        console.log(selectedCategoryData.strCategory);

        // Set local storage to send selected category data to detail page
        const meal = meals.filter((meal) => meal.idMeal == mealId)[0]

        localStorage.setItem('detailMeal', JSON.stringify(meal))
        localStorage.setItem('selectedCategory', JSON.stringify(selectedCategoryData.strCategory))

        window.location.href = `meal-detail.html?mealId=${encodeURIComponent(meal.idMeal)}`
    })
})