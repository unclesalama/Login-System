var container = document.querySelector(`#container`)
var registerBtn = document.querySelector(`#register`)
var loginBtn = document.querySelector(`#login`)
var signedBtn = document.querySelector(`.signed`)
var confirmed = document.querySelector(`.confirmed`)
var loged = document.querySelector(`.loged`)
var userName = document.querySelector(`.name-su`)
var userEmail = document.querySelector(`.email-su`)
var userPassword = document.querySelector(`.password-su`)
var loginMail = document.querySelector(`.loginMail`)
var loginPass = document.querySelector(`.loginPass`)
// var welcome = document.querySelector(`.welcome`)
var secContainer = document.querySelector(`.secContainer`)
var recipeInput = document.getElementById(`recipeInput`)
var logout = document.getElementById(`logout`)

var users  ;

if( localStorage.getItem(`usersData`) == null ){
    users =[];
  }
 else {
    users = JSON.parse(localStorage.getItem(`usersData`)) ;
  }



registerBtn.addEventListener(  `click` , function(){
    container.classList.add(`active`);
}    );

loginBtn.addEventListener(  `click` , function(){
    container.classList.remove(`active`);
}    );

signedBtn.addEventListener(  `click` , function(){
    confirmed.classList.remove(`d-none`);
    container.classList.remove(`active`);

    addUser();

}    );

loged.addEventListener(  `click` , function(){
    confirmed.classList.add(`d-none`);
    clearLogin();
    signedIn();

}    );

// sign up



function addUser(){

    var user ={
        name : userName.value,
        email : userEmail.value,
        password : userPassword.value,

    }
    users.push(user);
    localStorage.setItem(`usersData` , JSON.stringify(users));
    clear();

    console.log(users[0].name);
}

function clear() {
     userName.value = null
     userEmail.value = null
     userPassword.value = null
     console.log(`hr`);
}


// userName.addEventListener(  `onchange` , validateInput(this)   );
// userEmail.addEventListener(  `oninput` , validateInput(this)   );
// userPassword.addEventListener(  `oninput` , validateInput(this)   );

function validateInput(element){

    var regex ={
        name : /^[A-Z][a-z]{2,}$/,
        email : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        password : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    }

    if (regex[element.id].test(element.value) == true){
      element.classList.add(`is-valid`);
      element.classList.remove(`is-invalid`);
      element.nextElementSibling.classList.add(`d-none`);
  
      return true;
    }else{
      element.classList.add(`is-invalid`);
      element.classList.remove(`is-valid`);
      element.nextElementSibling.classList.remove(`d-none`);
      return false;
  
    }
  
  
  
  }

// sign in
loginPass.addEventListener(  `input` , function(){
    signIn();
}  )
function signIn(){
    for (var i = 0 ; i < users.length ; i++ ){
        if ( users[i].email == loginMail.value && users[i].password !== loginPass.value  ){
            loged.classList.add("disabled");
            loginMail.classList.add("is-invalid");
            loginPass.classList.add("is-invalid");
            loginPass.nextElementSibling.classList.remove(`d-none`);

        }
        
        
        else if ( users[i].email !== loginMail.value && users[i].password == loginPass.value  ){
            loged.classList.add("disabled");
            loginMail.classList.add("is-invalid");
            loginPass.classList.add("is-invalid");
            loginMail.nextElementSibling.classList.remove(`d-none`);


        }
        else if (users[i].email == loginMail.value && users[i].password == loginPass.value ){
            console.log(  `welcome ${users[i].name}`);
            loged.classList.remove("disabled");
            loginMail.classList.add("is-valid");
            loginPass.classList.add("is-valid");
            loginMail.classList.remove("is-invalid");
            loginPass.classList.remove("is-invalid");
            loginMail.nextElementSibling.classList.add(`d-none`);
            loginPass.nextElementSibling.classList.add(`d-none`);
            // welcome.value = (`Welcome ${users[i].name}`);
            document.getElementById('welcome').innerHTML = `Welcome ${users[i].name}`




        } 
    }
    
}

function clearLogin(){
    loginMail.value = null 
    loginPass.value = null
}

function signedIn(){
    container.classList.add(`d-none`);
    secContainer.classList.remove(`d-none`);
    

}


var allRecipes = [];

async function getRecipe(recipe){
  var response = await fetch( `https://forkify-api.herokuapp.com/api/search?q=${recipe}`   )
  var finalData = await response.json();
  allRecipes = finalData.recipes;
  display();
  
  
}

recipeInput.addEventListener( `input` , function(){
    getRecipe(recipeInput.value);


}  )



function display(){
  
    var cartona = ``
    for( var i=0 ; i<allRecipes.length ; i++ ){

        cartona += `<div class="col-md-2 py-2">
            <div class="recipe">
              <h2 class="h6 text-white">${allRecipes[i].title}</h2>
              <img class="w-100" src="${allRecipes[i].image_url}" alt="">
            </div>
          </div>`

    }
    document.getElementById(`rowData`).innerHTML= cartona;


}

function logedOut(){
    container.classList.remove(`d-none`);
    secContainer.classList.add(`d-none`);
    loged.classList.add("disabled");
            loginMail.classList.remove("is-valid");
            loginPass.classList.remove("is-valid");
    

}

logout.addEventListener (  `click` , function(){
    confirmed.classList.remove(`d-none`);
    clearLogin();
    logedOut();

}    );