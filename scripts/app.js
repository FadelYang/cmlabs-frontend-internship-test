$(document).ready(function () {
  let mealCategories = []

  $.get('https://www.themealdb.com/api/json/v1/1/categories.php', function (data) {
    mealCategories = data.categories

    const cards = mealCategories.map((mealCategory) => MealCategoryCard(mealCategory)).join('')

    $('#mealCategoriesContainer').html(cards)
  })

  function MealCategoryCard(mealCategory) {
    return `
            <div class="card col-4" style="width: 18rem;">
              <img src="${mealCategory.strCategoryThumb}" class="card-img-top p-3" alt="...">
              <div class="card-body text-center">
                <h5 class="card-title">${mealCategory.strCategory}</h5>
                <a href="#" class="btn btn-dark meals-category-link" data-name="${mealCategory.strCategory}">Check Meals</a>
              </div>
            </div>
        `
  }

  // Get meals by category
  $(document).on('click', '.meals-category-link', function (e) {
    e.preventDefault();

    const categoryName = $(this).data('name')

    // Set local storage to send selected category data to detail page
    const selectedCategoryData = mealCategories.filter((mealCategory) => mealCategory.strCategory == categoryName)[0]

    localStorage.setItem('selectedCategoryData', JSON.stringify(selectedCategoryData))

    window.location.href = `pages/category-detail.html?categoryName=${encodeURIComponent(categoryName)}`
  })
})