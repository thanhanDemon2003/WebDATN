import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyAxRiY-ZyqV_pXgGD-kt-MG4K0SKsEPCI4",
  authDomain: "datn-demon.firebaseapp.com",
  projectId: "datn-demon",
  storageBucket: "datn-demon.appspot.com",
  messagingSenderId: "515613105980",
  appId: "1:515613105980:web:e3184dfa3bf8b80ed94839",
  measurementId: "G-RBGCF8TT8X",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const ggProvider = new GoogleAuthProvider();
// const fbProvider = new FacebookAuthProvider();
(function () {
  const btnGoogle = document.getElementById("btnGoogle");
  // const btnFaceBook = document.getElementById('btnFacebook');

  btnGoogle.addEventListener("click", (e) => {
    signInWithPopup(auth, ggProvider)
      .then((result) => {
        const userGG = JSON.stringify(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
          console.log('Google>', userGG);
          console.log('User>>Google>', user); 
          window.location.href = "/payment/#idgg=" + user.uid;

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error>", error);
        console.log("Error code>", errorCode);
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  });

  //Sing in with Facebook
  // btnFaceBook.addEventListener('click', e => {
  //   signInWithPopup(auth, fbProvider).then(result => {
  //         var token = result.credential.accessToken;
  //         var user = result.user;
  //         console.log('Facebook>', result);
  //         console.log('User>>Facebook>', user);
  //         // ...
  //         userId = user.uid;

  //     }).catch(function(error) {
  //         // Handle Errors here.
  //         var errorCode = error.code;
  //         var errorMessage = error.message;
  //         // The email of the user's account used.
  //         var email = error.email;
  //         // The firebase.auth.AuthCredential type that was used.
  //         var credential = error.credential;
  //         // ...
  //         console.error('Error: hande error here>Facebook>>', error.code)
  //     });
  // }, false)
})();
