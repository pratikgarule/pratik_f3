


// store the hyperlink for signup and profile page
const signUpPageEl = document.getElementById('signUp');
const profilePageEl = document.getElementById('profile');

// Storing all form input elements
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const cnfPasswordEl = document.getElementById('confirmPassword');
const successEl = document.getElementById('success');
const errorEl = document.getElementById('error');
const passwordMismatchedEl = document.getElementById('passwordMismatched');
const invalidemailEl = document.getElementById('invalidEmail');
const submitBtn = document.getElementById('submit-btn');


//initializing an empty array
const inputDetailsArray = [];
let userObj = {};
let usersArray = [];  // this array will store the userObj and this array then will be stored in local storage in the form of string

//If local storage contails accessToken (user leaves browser without logging out) user should redirect to profile page directly
if (window.localStorage.getItem('accessToken')) {
  window.location.href = './profile.html';
}


// listener & functions

// submit btn
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  submitDetails();
})

function submitDetails() {
  // reinitialising this array will help if there is any error occurred while authentication
  inputDetailsArray.length = 0;
  const name = nameEl.value.trim();
  inputDetailsArray.push(name);
  const email = emailEl.value.trim();
  inputDetailsArray.push(email);
  const password = passwordEl.value.trim();
  inputDetailsArray.push(password);
  const cnfPassword = cnfPasswordEl.value.trim();
  inputDetailsArray.push(cnfPassword);

  console.log(inputDetailsArray);

  // checking that all  fields are filled or not
  if (inputDetailsArray.includes('')) {
    console.log('error block');
    errorEl.classList.remove('hidden');
    successEl.classList.add('hidden');
  } else {
    if (password !== cnfPassword) {
      passwordMismatchedEl.classList.remove('hidden');
    } else if (!(email.split('').includes('@'))) {  // i.e. if email does not contain @ --> display error message
      invalidemailEl.classList.remove('hidden');
    } else {
      successEl.classList.remove('hidden');
      errorEl.classList.add('hidden');
      passwordMismatchedEl.classList.add('hidden');
      invalidemailEl.classList.add('hidden');
      setLocalStorageRedirectToProfile(name, email, password);  // function no 5
    }
  }
}


// Set user in local storage function
function setItemInLocalStorage(usersArray, accessToken) {
  window.localStorage.setItem('users', JSON.stringify(usersArray));  // store users data in local storage with key as 'users' and value as userArray in string form
  // set the state of the user >> '1' = yes user signed up and logged in, '0' = user logged out from previous session so cant show the profile page
  window.localStorage.setItem('state', '1');
  // set the accessToken for this user
  window.localStorage.setItem('accessToken', accessToken);
}


//  Sign up page btn event listener
signUpPageEl.addEventListener('click', () => {
  // nothing should happen
  alert('You are present on sign up page');
})

// Profile page btn(navbar) event listener
profilePageEl.addEventListener('click', () => {
  alert('Please sign up first');
})

//set element in local storage and redirect the user to profile page function
function setLocalStorageRedirectToProfile(name, email, password) {
  // inputDetailsArray is an array
  let accessToken = `${Math.random().toString(26).slice(2)}${Math.random().toString(26).slice(2, 6)}`; // 16 char token
  userObj.name = name;
  userObj.email = email;
  userObj.password = password;
  usersArray.push(userObj);
  // set userdetails in local storage
  setItemInLocalStorage(usersArray, accessToken)  // function no 02
  // set input deatails array as empty
  // redirect user to the profile page
  window.location.href = './profile.html';
}
