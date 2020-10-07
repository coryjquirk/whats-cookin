function searchIngred(foodItem){
    var queryURL = "https://www.themealdb.com/api/json/v2/9973533/filter.php?i=" + foodItem
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
    // console.log(response.meals[1])
    for (i = 0; i < 3; i++) {
          var recipeID = response.meals[i].idMeal
          // console.log (recipeID)
          var idURL = "https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=" + recipeID
          console.log("idurl "+ i + idURL)
            $.ajax({
                url: idURL,
                method: "GET"
            })
      .then(function(response) {
        console.log(response)

        $("#recipeName1").text(response.meals[i].strMeal);

        var dbLink = "https://www.themealdb.com/meal.php?c=" + response.meals[i].idMeal;
        $("#recipeLink1").text(dbLink);
        $("#mealThumb1").prepend("<img src=" + response.meals[i].strMealThumb + ' id="thumb">')
        $("#ingList1").append(response.meals[i].strIngredient1+"<br>", response.meals[i].strIngredient2+ "<br>", response.meals[0].strIngredient3+ "<br>")
        console.log(response.meals[i].strYoutube)
        //info to include with each recipe:
          //thumbnail
          //recipe name
          //button/link/clickable image for external recipe link

      })
    }
  });
}





$("#searchBtn").click(function(){
    var ingredient = $("#searchBar").val().trim();
    $("#searchBar").val("");
    var newBtn = $("<button>");
    if($(".ingredient2").length){
        alert("Just two ingredients for now")
        return
    }
    if ($(".ingredient1").length){
        newBtn.attr("id", ingredient.replace(/\s+/g, ''));
        newBtn.attr("class", "ingredient2 ingredient")
        newBtn.text(ingredient);
        $("#buttonBox").append(newBtn);
        var twoIngreds = $(".ingredient1").text() + "," + ingredient
        searchIngred(twoIngreds)
        return
    }
    newBtn.attr("id", ingredient.replace(/\s+/g, ''));
    newBtn.attr("class", "ingredient1 ingredient")
    newBtn.text(ingredient);
    $("#buttonBox").append(newBtn);
    searchIngred(ingredient);
});

$(document).on('click','.ingredient', function(event){
    $(this).remove()
    if ($(".ingredient").length) {
        searchIngred($(".ingredient").text())
    }
});