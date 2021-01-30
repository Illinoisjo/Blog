const logOut = document.getElementById('logOut');
const mergeAccounts = document.getElementById('mergeAccounts');
const modifyAccount = document.getElementById('modifyAccount');
const displayNameHolder = document.getElementById('displayNameHolder');
const photoHolder = document.getElementById('photoHolder');

const auth = firebase.auth();

logOut.addEventListener('click', () => {
    //signOut() is a built in firebase function responsible for signing a user out
    auth.signOut()
    .then(() => {
        window.location.assign('../');
    })
    .catch(error => {
        console.error(error);
    })
})

auth.onAuthStateChanged(user => {
    console.log(user);
    //display the displayName and photoURL of the user on the page
    if(user.displayName)
        displayNameHolder.innerText = user.displayName;
    if(user.photoURL)
        photoHolder.setAttribute('src', user.photoURL);
})

//Go to modification page
modifyAccount.addEventListener('click', () => {
    window.location.assign('../edit');
});

//Go to merge accounts page
mergeAccounts.addEventListener('click', () => {
    window.location.assign('../merge');
});

auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(error);
    });
  // [END auth_set_persistence_session]