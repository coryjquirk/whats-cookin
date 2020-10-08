function searchIngred(foodItem){
    $( ".results" ).empty();
    var queryURL = "https://cors-anywhere.herokuapp.com/https://www.themealdb.com/api/json/v2/9973533/filter.php?i=" + foodItem
    $.ajax({
      url: queryURL,
      method: "GET"
    })
     
      .then(function(response) {
    // console.log(response.meals[1])
      
        for (let index = 0; index < 10; index++) {
          var recipeID = response.meals[index].idMeal
          // console.log (recipeID)
          var idURL = "https://cors-anywhere.herokuapp.com/https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=" + recipeID
            $.ajax({
            url: idURL,
            method: "GET"
            })
  
      .then(function(response) {
        
        
        
      
        
        var recipeTitle = response.meals[0].strMeal;
        var recipeThumb = response.meals[0].strMealThumb;
        var sourceLink = response.meals[0].strSource;
        var recipeYoutube = response.meals[0].strYoutube;
        console.log("DA TITLE " + recipeTitle)
        console.log("DA THUMBNAIL LINK " + recipeThumb)
        console.log("DIS BE DA SOURCE LINk " + sourceLink)
        console.log("YOUTUBE LINK " + recipeYoutube)
        publishInfo(recipeTitle, recipeThumb, sourceLink, recipeYoutube)
        
    })
    }
  });
  }
  
  
  function publishInfo(recipeTitle, recipeThumb, sourceLink, recipeYoutube){
    $("<div>").attr({
        'class': "recipeTitle",
        'id': recipeTitle.replace(/\s+/g, '') + "recipeTitle"
      }).appendTo(".results");
    $("<div>").attr({
      'class': "thumbnail",
      'id': recipeTitle.replace(/\s+/g, '') + "thumbnail"
    }).appendTo(".results");
    $("<div>").attr({
      'class': "recipeLinks",
      'id': recipeTitle.replace(/\s+/g, '') + "recipeLinks"
    }).appendTo(".results");
    innerDivs(recipeTitle, recipeThumb, sourceLink, recipeYoutube)
  }
  function innerDivs(recipeTitle, recipeThumb, sourceLink, recipeYoutube){
    $("<img>").attr({
      'src': recipeThumb,
      'class': "thumbnailImg",
    }).appendTo("#"+recipeTitle.replace(/\s+/g, '') + "thumbnail")
    
    $("<h5>").text(recipeTitle).appendTo("#"+recipeTitle.replace(/\s+/g, '') +"recipeTitle")
   
    $("<a>").html("<id class='fab fas fa-carrot'></id>").attr({
     "href": sourceLink,
   }).appendTo("#"+recipeTitle.replace(/\s+/g, '') +"recipeLinks")
   
   $("<a>").html("<id class='fab fa-youtube-square'></id>").attr({
     "href": recipeYoutube
   }).appendTo("#"+recipeTitle.replace(/\s+/g, '') +"recipeLinks")
  }
  
  
  
  
  $("#searchBtn").click(function(){
      var ingredient = $("#searchBar").val().trim();
      $("#searchBar").val();
      
      var newBtn = $("<button>");
      
      if ($("#ingredient1").length){
        newBtn.attr("id", "ingredient2");
        newBtn.attr("class", "abtn")
        newBtn.text(ingredient);
        $(".ingredient2").append(newBtn);
        var twoIngreds = $("#ingredient1").text() + "," + ingredient
        searchIngred(twoIngreds)
        console.log("banana")
        return
        }
      
      newBtn.attr("id", "ingredient1");
      newBtn.attr("class", "abtn")
      newBtn.text(ingredient);
      $(".ingredient1").append(newBtn);
      searchIngred(ingredient)
      
    });
  
   
    $(document).on('click','.abtn', function(event){
      $(this).remove()
        if ($(".abtn").length) {
          searchIngred($(".abtn").text())
          
        }
    });
    
  
  
    function getCoordintes() {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        ximumAge: 0,
      };
    
      function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude.toString();
        var lng = crd.longitude.toString();
        var coordinates = [lat, lng];
        getCity(coordinates);
        return;
      }
    
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
    
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
    
    function getCity(coordinates) {
      var xhr = new XMLHttpRequest();
      var lat = coordinates[0];
      var lng = coordinates[1];
    
      xhr.open(
        "GET",
        "https://us1.locationiq.com/v1/reverse.php?key=pk.e87a2cda53fae1cd1bea780cbaa3ca5c&lat=" +
          lat +
          "&lon=" +
          lng +
          "&format=json",
        true
      );
      xhr.send();
      xhr.onreadystatechange = processRequest;
      xhr.addEventListener("readystatechange", processRequest, false);
    
      function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var response = JSON.parse(xhr.responseText);
          // console.log(response.lat)
          // console.log(response.lon)
          getGrocery(response.lat, response.lon)
          return;
        }
      }
    }
  
  $("#findGrocery").click(function(){
  getCoordintes()
  });
  
  function getGrocery(latitude, longitude){
    window.open("https://www.google.com/maps/search/grocery+stores/@" + latitude + "," + longitude + ",12z/data=!4m4!2m3!5m1!2e1!6e6", '_blank')
  
  }
  
// function searchIngred(foodItem){
//     var queryURL = "https://www.themealdb.com/api/json/v2/9973533/filter.php?i=" + foodItem
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })
     
//       .then(function(response) {
//     // console.log(response.meals[1])
      
//         for (let index = 0; index < response.meals.length; index++) {
//           var recipeID = response.meals[index].idMeal
//           // console.log (recipeID)
//           var idURL = "https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=" + recipeID
//             $.ajax({
//             url: idURL,
//             method: "GET"
//             })
  
//       .then(function(response) {
        
//         var recipeTitle = response.meals[0].strMeal;
//         var recipeThumb = response.meals[0].strMealThumb;
//         var sourceLink = response.meals[0].strSource;
//         var recipeYoutube = response.meals[0].strYoutube;
//         // console.log(response.meals[0].strMeal)
//         // console.log(response.meals[0].strMealThumb)
//         // console.log(response.meals[0].strSource)
//         // console.log(response.meals[0].strYoutube)
        
//         var titleH = $("<h5>");
//         var thumbN = $("<img>");
//         var sourceCLick = $("<a>");
//         var youtubeLink = $("<a>");
        
//         console.log("are you there??" + sourceCLick)
//         // sourceClick.href(sourceLink)
//         // sourceClick.text("Icon goes here")
//         // youtubeLink.href(recipeYoutube)
//         // youtubeLink.text("sweet youtube link")
//         titleH.text(recipeTitle)
//         thumbN.attr("src", recipeThumb)
//         sourceCLick.html("<id class='fab fas fa-carrot'></id>")
//         youtubeLink.html("<id class='fab fa-youtube-square'></id>")
//         sourceCLick.attr("href", sourceLink)
//         youtubeLink.attr("href", recipeYoutube)
//         sourceCLick.attr("target", "_blank")
//         youtubeLink.attr("target", "_blank")
  
//         $("#recipeCards").prepend(titleH, thumbN, sourceCLick, youtubeLink)
        
//     })
//     }
//   });
//   }
  
//   $("#searchBtn").click(function(){
//       var ingredient = $("#searchBar").val().trim();
//       $("#searchBar").val("");
      
//       var newBtn = $("<button>");
//       if($(".ingredient2").length){
//         alert("Just two ingredients for now")
//         return
//       }
//       if ($(".ingredient1").length){
//         newBtn.attr("id", ingredient.replace(/\s+/g, ''));
//         newBtn.attr("class", "ingredient2 ingredient")
//         newBtn.text(ingredient);
//         $("#buttonBox").append(newBtn);
//         var twoIngreds = $(".ingredient1").text() + "," + ingredient
//         searchIngred(twoIngreds)
//         return
//         }
      
//       newBtn.attr("id", ingredient.replace(/\s+/g, ''));
//       newBtn.attr("class", "ingredient1 ingredient")
//       newBtn.text(ingredient);
//       $("#buttonBox").append(newBtn);
//       searchIngred(ingredient)
      
//     });
  
   
//   $(document).on('click','.ingredient', function(event){
//     $(this).remove()
//       if ($(".ingredient").length) {
//         searchIngred($(".ingredient").text())
        
//       }
//   });
  
//   function getCoordintes() {
//     var options = {
//       enableHighAccuracy: true,
//       timeout: 5000,
//       maximumAge: 0,
//     };
  
//     function success(pos) {
//       var crd = pos.coords;
//       var lat = crd.latitude.toString();
//       var lng = crd.longitude.toString();
//       var coordinates = [lat, lng];
//       getCity(coordinates);
//       return;
//     }
  
//     function error(err) {
//       console.warn(`ERROR(${err.code}): ${err.message}`);
//     }
  
//     navigator.geolocation.getCurrentPosition(success, error, options);
//   }
    
//   function getCity(coordinates) {
//     var xhr = new XMLHttpRequest();
//     var lat = coordinates[0];
//     var lng = coordinates[1];
  
//     xhr.open(
//       "GET",
//       "https://us1.locationiq.com/v1/reverse.php?key=pk.e87a2cda53fae1cd1bea780cbaa3ca5c&lat=" +
//         lat +
//         "&lon=" +
//         lng +
//         "&format=json",
//       true
//     );
//     xhr.send();
//     xhr.onreadystatechange = processRequest;
//     xhr.addEventListener("readystatechange", processRequest, false);
  
//     function processRequest(e) {
//       if (xhr.readyState == 4 && xhr.status == 200) {
//         var response = JSON.parse(xhr.responseText);
//         // console.log(response.lat)
//         // console.log(response.lon)
//         getGrocery(response.lat, response.lon)
//         return;
//       }
//     }
//   }
  
//   $("#findGrocery").click(function(){
//   getCoordintes()
//   });
  
//   function getGrocery(latitude, longitude){
//     window.open("https://www.google.com/maps/search/grocery+stores/@" + latitude + "," + longitude + ",12z/data=!4m4!2m3!5m1!2e1!6e6", '_blank')
//   }