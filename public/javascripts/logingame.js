import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
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
const auth = getAuth(app);

const ggProvider = new GoogleAuthProvider();
(function () {
  const btnGoogle = document.getElementById("btnGoogle");

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
          window.location.href = "/logingamesuccess/#idgg=" + user.uid+"&name=" + user.displayName;
          let data = {
            user: user.uid,
            name: user.displayName,
            // email: user.email
          };
        

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error>", error);
        console.log("Error code>", errorCode);
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  });
})();
