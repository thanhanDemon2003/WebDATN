(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

window.fbAsyncInit = function () {
  FB.init({
    appId: "317289147672827",
    xfbml: true,
    version: "v18.0",
  });
const btnLoginFB = document.querySelector("#fb-login-button");
btnLoginFB.addEventListener("click", function (e) {
  FB.login(function (response) {
    if (response.authResponse) {
      console.log("Welcome!  Fetching your information.... ");
      FB.api("/me", { fields: "name, email, id" }, function (response) {
        Swal.fire({
          icon: "success",
          title: "Fetching your information....",
          text: `Welcome! ${response.name}`,
        });
        const idFb = response.id;
        console.log(idFb);
        loginApi(idFb);
      });
    } else {
      console.log("User cancelled login or did not fully authorize.");
    }
  });
})
}

async function loginApi(id) {
  try {
    const url =
  "https://gamedatn.andemongame.tech/games/loginpayment?token=" + id;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Lỗi kết nối API");
    }

    const data = await response.json();
    localStorage.setItem("data", data);
    if (data.success) {
      window.location.href = "https://thanhan.andemongame.tech/tes/PayWeb/index.html";
      console.log(data);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.notification,
      });
    }
  } catch (error) {
    console.log(error);
  }
}