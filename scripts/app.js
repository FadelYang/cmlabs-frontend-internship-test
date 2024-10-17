$(document).ready(function () {
  $.get('https://www.themealdb.com/api/json/v1/1/categories.php', function (data) {
    const mealCategories = data.categories

    const cards = mealCategories.map((mealCategory) => MealCategoryCard(mealCategory)).join('')

    $('#mealCategoriesContainer').html(cards)
  })

  function MealCategoryCard(mealCategory) {
    return `
            <div class="card col-4" style="width: 18rem;">
              <img src="${mealCategory.strCategoryThumb}" class="card-img-top p-3" alt="...">
              <div class="card-body text-center">
                <h5 class="card-title">${mealCategory.strCategory}</h5>
                <a href="#" class="btn btn-dark">Check Meals</a>
              </div>
            </div>
        `
  }
})