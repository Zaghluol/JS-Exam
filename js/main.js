/// <reference types="../@types/jquery" />
var nameInput = document.getElementById("userName")
var emailInput = document.getElementById("userEmail")
var passwordInput = document.getElementById("userpass")
var repassInput = document.getElementById("rePassword")
var PhoneInput = document.getElementById("userPhone")
var btn = document.getElementById("btn")
var snameInput = document.getElementById("sName")
var sletterInput = document.getElementById("sLetter")
var disable = true
var usersList = [];
if(localStorage.getItem("datalist") !=null){
    usersList = JSON.parse(localStorage.getItem("datalist"))
}
function newUser(){
    if(validName() && validPassword() && validEmail()){
            var user= {
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
            }
            usersList.push(user)
            localStorage.setItem("datalist",JSON.stringify(usersList)) 
    }
    else{
        validly.innerHTML="empty or incorrect input"
            validly.classList.add("text-black")
            validly.classList.remove("text-white")
    }
}
$("#userEmail").keyup(function(){
    if(validEmail()){
        $("#v-email").css("display", "none");
    }
    else{
        $("#v-email").css("display", "block");
        btn.setAttribute('disabled','');
    }
})
$("#userPhone").keyup(function(){
    if(validPhone()){
        $("#v-phone").css("display", "none");
    }
    else{
        $("#v-phone").css("display", "block");
        btn.setAttribute('disabled','');
    }
})
$("#userpass").keyup(function(){
    if(validPassword()){
        $("#v-pass").css("display", "none");
    }
    else{
        $("#v-pass").css("display", "block");
        btn.setAttribute('disabled','');
    }
})
$("#rePassword").keyup(function(){
    if(passwordInput.value == repassInput.value){
        $("#v-repass").css("display", "none");
        btn.removeAttribute('disabled','')
    }
    else{
        $("#v-repass").css("display", "block");
        btn.setAttribute('disabled','');
    }
})
function validName(){
    var rexname = /^\w{2,18}$/gm
    if(rexname.test(nameInput.value)){
        return true;
    }
    else{
        return false
    }
}
  function validPhone(){
    var rexname = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm
    if(rexname.test(PhoneInput.value)){
        return true;
    }
    else{
        return false
    }
}
function validEmail(){
    var rexemail = /^\w{2,}@\w{2,}\.[a-z]{2,3}$/gm
    if(rexemail.test(emailInput.value)){
        return true;
    }
    else{
        return false
    }
}
function validPassword(){
    var rexpassword = /^(?=.+[0-9])(?=.+[!@#$%^])[a-z A-z 0-9 !@#$%^]{6,18}$/gm
    if(rexpassword.test(passwordInput.value)){
        return true;
    }
    else{
        return false
    }
}

  $("#close").click(function(){
    $(".nav-side").css("left", "-20%");
    $(".control").css("left", "-20%");
    $("#open").css("display", "block");
    $("#close").css("display", "none");
  });
  $("#open").click(function(){
    $(".nav-side").css("left", "0");
    $(".control").css("left", "0");
    $("#open").css("display", "none");
    $("#close").css("display", "block");
  });
  $("#categ").click(function(){
    $("#startRow").css("display", "none");
    $("#a-row").css("display", "none");
    $("#i-row").css("display", "none");
    $(".search").css("display", "none");
    $("#contact").css("display", "none");
    $("#c-row").css("display", "flex");
    $("#searchNRow").css("display", "none");
    $("#searchLRow").css("display", "none");
    $("#filterCgRow").css("display", "none");
  });
  $("#area").click(function(){
    $("#startRow").css("display", "none");
    $("#a-row").css("display", "flex");
    $("#i-row").css("display", "none");
    $(".search").css("display", "none");
    $("#c-row").css("display", "none");
    $("#contact").css("display", "none");
    $("#searchNRow").css("display", "none");
    $("#searchLRow").css("display", "none");
    $("#filterCgRow").css("display", "none");
  });
  $("#gred").click(function(){
    $("#startRow").css("display", "none");
    $("#a-row").css("display", "none");
    $("#i-row").css("display", "flex");
    $("#c-row").css("display", "none");
    $(".search").css("display", "none");
    $("#contact").css("display", "none");
    $("#searchNRow").css("display", "none");
    $("#searchLRow").css("display", "none");
    $("#filterCgRow").css("display", "none");
  });
  $("#contc").click(function(){
    $("#startRow").css("display", "none");
    $("#a-row").css("display", "none");
    $("#i-row").css("display", "none");
    $("#c-row").css("display", "none");
    $(".search").css("display", "none");
    $("#contact").css("display", "flex");
    $("#searchNRow").css("display", "none");
    $("#searchLRow").css("display", "none");
    $("#filterCgRow").css("display", "none");
  });
  $("#search").click(function(){
    $("#startRow").css("display", "none");
    $("#a-row").css("display", "none");
    $("#i-row").css("display", "none");
    $("#c-row").css("display", "none");
    $("#contact").css("display", "none");
    $(".search").css("display", "flex");
    $("#searchNRow").css("display", "none");
    $("#searchLRow").css("display", "none");
    $("#filterCgRow").css("display", "none");
  });
  $("#sName").keyup(function(){
    $("#searchNRow").css("display", "flex");
    $("#searchLRow").css("display", "none");
    let searchNList= []
    let name = new XMLHttpRequest()
    name.open('get' ,
         `https://www.themealdb.com/api/json/v1/1/search.php?s=${snameInput.value}`)
    name.send()
    name.addEventListener("readystatechange", function(){
        if(name.readyState == 4){
            let data = JSON.parse(name.response)
            searchNList = data.meals
            console.log(searchNList); 
            showSearchN()
        }
    })
    function showSearchN(){
        let temp = ""
        searchNList.forEach( (e,i) => {
          if(i==25){
              return
          }
            temp += `<div class="col-3">
                   <div class="image">
                      <img src="${e.strMealThumb}" class="w-100" alt="">
                      <div class="layer">
                          <h2>${e.strMeal}</h2>
                      </div>
                   </div>
              </div>`
        });
    document.getElementById("searchNRow").innerHTML = temp
    }    
})
  $("#sLetter").keyup(function(){
    $("#searchNRow").css("display", "none");
    $("#searchLRow").css("display", "flex");
    console.log(sletterInput.value);
    let sLetterList= []
    let letter = new XMLHttpRequest()
    letter.open('get' ,
         `https://www.themealdb.com/api/json/v1/1/search.php?s=${sletterInput.value}`)
    letter.send()
    letter.addEventListener("readystatechange", function(){
        if(letter.readyState == 4){
            let data = JSON.parse(letter.response)
            sLetterList = data.meals
            console.log(sLetterList); 
            showSearchL()
        }
    })
    function showSearchL(){
        let temp = ""
        sLetterList.forEach( (e,i) => {
          if(i==25){
              return
          }
            temp += `<div class="col-3">
                   <div class="image">
                      <img src="${e.strMealThumb}" class="w-100" alt="">
                      <div class="layer">
                          <h2>${e.strMeal}</h2>
                      </div>
                   </div>
              </div>`
        });
    document.getElementById("searchLRow").innerHTML = temp;
    }    
})


document.addEventListener('click', function(e){
    if(e.target.className == 'fs-6 fw-semibold' ||
         e.target.className == 'c-h2' ||e.target.className == 'image' ||
         e.target.className == 'c-layer' ){
            $("#c-row").css("display", "none");
            $("#filterCgRow").css("display", "flex");
            console.log(e);
            let ctgList= []
    let ctg = new XMLHttpRequest()
    ctg.open('get' ,
         `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.className}`)
    ctg.send()
    ctg.addEventListener("readystatechange", function(){
        if(ctg.readyState == 4){
            let data = JSON.parse(ctg.response)
            ctgList = data.meals
            console.log(ctgList);
            console.log(e.target.className); 
            showCtgfilter()
        }
    })
    function showCtgfilter(){
        let temp = ""
        ctgList.forEach( (e,i) => {
          if(i==25){
              return
          }
            temp += `<div class="col-3">
                   <div class="image">
                      <img src="${e.strMealThumb}" class="w-100" alt="">
                      <div class="layer">
                          <h2>${e.strMeal}</h2>
                      </div>
                   </div>
              </div>`
        });
    document.getElementById("filterCgRow").innerHTML = temp
    }
   // --------------------- 
    }
    else if(e.target.className == 'a-h4'){
        $("#c-row").css("display", "none");
        $("#filterCgRow").css("display", "flex");
        console.log(e);
        let areList= []
let ctg = new XMLHttpRequest()
ctg.open('get' ,
     `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.h2}`)
ctg.send()
ctg.addEventListener("readystatechange", function(){
    if(ctg.readyState == 4){
        let data = JSON.parse(ctg.response)
        areList = data.meals
        console.log(areList); 
        showareafilter()
    }
})
function showareafilter(){
    let temp = ""
    areList.forEach( (e,i) => {
      if(i==25){
          return
      }
        temp += `<div class="col-3">
               <div class="image">
                  <img src="${e.strMealThumb}" class="w-100" alt="">
                  <div class="layer">
                      <h2>${e.strMeal}</h2>
                  </div>
               </div>
          </div>`
    });
document.getElementById("filterCgRow").innerHTML = temp
}
    }
  })
// ----------------------------------------------
  let startList= []
  let start = new XMLHttpRequest()
  start.open('get' , 'https://www.themealdb.com/api/json/v1/1/search.php?s=')
  start.send()
  start.addEventListener("readystatechange", function(){
      if(start.readyState == 4){
          let data = JSON.parse(start.response)
          startList = data.meals
          console.log(startList); 
          showStart()
      }
  })
  function showStart(){
      let temp = ""
      startList.forEach( (e,i) => {
        if(i==25){
            return
        }
          temp += `<div class="col-3">
                 <div class="image">
                    <img src="${e.strMealThumb}" class="w-100" alt="">
                    <div class="layer">
                        <h2>${e.strMeal}</h2>
                    </div>
                 </div>
            </div>`
      });
  document.getElementById("startRow").innerHTML = temp
  }
  let categoryList= []
  let catg = new XMLHttpRequest()
  catg.open('get' , 'https://www.themealdb.com/api/json/v1/1/categories.php')
  catg.send()
  catg.addEventListener("readystatechange", function(){
      if(catg.readyState == 4){
          let data = JSON.parse(catg.response)
          categoryList = data.categories
          console.log(categoryList); 
          showCategory()
      }
  })
  function showCategory(){
      let temp = ""
      categoryList.forEach(e => {
          temp += `<div class="col-3 ctg">
          <div class="image">
             <img src="${e.strCategoryThumb}" class="w-100" alt="">
             <div class="c-layer">
                 <h2 class="c-h2">${e.strCategory}</h2>
                 <p class="fs-6 fw-semibold">${e.strCategoryDescription}</p>
             </div>
          </div>
     </div>`
      });
  document.getElementById("c-row").innerHTML = temp
  }


  let areaList= []
  let area = new XMLHttpRequest()
  area.open('get' , 'https://www.themealdb.com/api/json/v1/1/list.php?a=list')
  area.send()
  area.addEventListener("readystatechange", function(){
      if(area.readyState == 4){
          let data = JSON.parse(area.response)
          areaList = data.meals
          console.log(areaList); 
          showArea()
      }
  })
  function showArea(){
      let temp = ""
      areaList.forEach(e => {
          temp += `<div class="col-3 text-center text-white">
                <i class="fa-solid fa-house-laptop"></i>
                        <h4 class="a-h4">${e.strArea}</h4>
                 </div>`
      });
  document.getElementById("a-row").innerHTML = temp
  }


  let ingerdientList= []
  let ingerd = new XMLHttpRequest()
  ingerd.open('get' , 'https://www.themealdb.com/api/json/v1/1/list.php?i=list')
  ingerd.send()
  ingerd.addEventListener("readystatechange", function(){
      if(ingerd.readyState == 4){
          let data = JSON.parse(ingerd.response)
          ingerdientList = data.meals
          console.log(ingerdientList); 
          shoeIngredient()
      }
  })
  function shoeIngredient(){
      let temp = ""
      ingerdientList.forEach((e,i) => {
           if(e.strDescription && i<20){
            temp += `<div class="col-3 text-center text-white">
                <i class="fa-solid fa-drumstick-bite"></i>
                        <h3>${e.strIngredient}</h3>
                        <p class="fs-6 i-desc">${e.strDescription}</p>
                 </div>`
           }
      });
  document.getElementById("i-row").innerHTML = temp
  }

  let keyMeal= []
  let key = new XMLHttpRequest()
  key.open('get' , 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772')
  key.send()
  key.addEventListener("readystatechange", function(){
      if(key.readyState == 4){
          let data = JSON.parse(key.response)
          keyMeal = data.meals
          console.log(keyMeal); 
          showKey()
      }
  })
  function showKey(){
      let temp = ""
      keyMeal.forEach(e => {
           temp += `<div class="col-4">
            <div class="image">
                <img src="${e.strMealThumb}" class="w-100" alt="">
            </div>
            <h2>${e.strMeal}</h2>
        </div>
        <div class="col-8">
            <h2>Instructions</h2>
            <p>${e.strInstructions}</p>
            <h2>Area ${e.strArea} :</h2>
            <h2>category ${e.strCategory}:</h2>
            <h2>Recipes :</h2>
            <div class="py-3 res">
            <span class="resipe">${e.strMeasure1 + e.strIngredient1}</span>
            <span class="resipe">${e.strMeasure2 + e.strIngredient2}</span>
            <span class="resipe">${e.strMeasure3 + e.strIngredient3}</span>
            <span class="resipe">${e.strMeasure4 + e.strIngredient4}</span>
            <span class="resipe">${e.strMeasure5 + e.strIngredient5}</span>
            <span class="resipe">${e.strMeasure6 + e.strIngredient6}</span>
            <span class="resipe">${e.strMeasure7 + e.strIngredient7}</span>
            <span class="resipe">${e.strMeasure8 + e.strIngredient8}</span>
            <span class="resipe">${e.strMeasure9 + e.strIngredient9}</span>
            <span class="resipe">${e.strMeasure10 + e.strIngredient10}</span>
            <span class="resipe">${e.strMeasure11 + e.strIngredient11}</span>
            <span class="resipe">${e.strMeasure12 + e.strIngredient12}</span>
            </div>
            <h2>Tags :</h2>
            <a href="${e.strTags}" target="_blank" class="btn btn-success">Source</a>
            <a href="${e.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
        </div>`
      });
  document.getElementById("k-row").innerHTML = temp
  }


 