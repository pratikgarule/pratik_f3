// store the hyperlink for the signup and profile page
const signUpPageEl = document.getElementById('signUp');
const profilePageEl = document.getElementById('profile');

// store the profile details elements
const nameEl = document.getElementById('fName');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('pPassword');
const userDetails = document.getElementById('user_deatails');
let currUser = JSON.parse(window.localStorage.getItem('users'))[0];  // here we get the user details in object format
displaydetails(currUser);
userDetails.classList.remove('hidden');
// Event listeners & functions
// logged out function
function logOut() {
  // logged out means deleting the data of the last signed up user
  window.localStorage.removeItem('users');
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('state');
  userDetails.classList.add('hidden');
//redirect
  window.location.href = './index.html';
}

// display user details
function displaydetails(currUser) {
  // currUser is an object containing  all the details of the last logged in/ signed up user
  nameEl.textContent = currUser.name.toUpperCase();
  emailEl.textContent = currUser.email;
  passwordEl.textContent = currUser.password;
}

// Sign up page btn(navbar) event listener
signUpPageEl.addEventListener('click', () => {
  alert('You are already signed up!!');
})

//  Profile page btn(navbar) event listener
profilePageEl.addEventListener('click', () => {
  // nothing should happen
  alert('You are on profile page');
})