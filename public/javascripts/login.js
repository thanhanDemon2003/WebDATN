

const facebookLogin = document.getElementById("loginfbne");

function statusChangeCallback(response) {
console.log(response, "đang gọi login nè");

  if (response.status === "connected") {
    console.log("connected");
    FB.api("/me", { fields: "name, email, id" }, function (response) {
      Swal.fire({
        icon: "success",
        title: "Bạn sẽ được chuyển tiếp, đợi xíu nhaa....",
        text: `Chào Mừng Bạn! ${response.name}`,
      });
      const idFb = response.id;
      console.log(idFb);
      loginApi(idFb);
    });
  }
  else {
    console.log("not connected");
    FB.login(function (response) {
      if (response.authResponse) {
        console.log("Chào Mừng Bạn! Đã Đăng Nhập. ");
        FB.api("/me", { fields: "name, email, id" }, function (response) {
          Swal.fire({
            icon: "success",
            title: "Bạn sẽ được chuyển tiếp, đợi xíu nhaa....",
            text: `Chào Mừng Bạn! ${response.name}`,
          });
          const idFb = response.id;
          console.log(idFb);
          loginApi(idFb);
        });
      } else {
        console.log("Người dùng đã hủy đăng nhập.");
      }
    }, true);
  }


}


window.fbAsyncInit = function () {
  FB.init({
    appId: "1996036064104031",
    cookie: true,
    xfbml: true,
    status: true,
    version: "v18.0",
  });
  FB.AppEvents.logPageView();
};

document.getElementById("loginfbne").addEventListener("click", function () {
       console.log("click event getLoginStatus");
      FB.getLoginStatus(function (response){
        statusChangeCallback(response);
      })
});



//   facebookLogin.addEventListener("click", function () {
//     console.log("click");
//     FB.getLoginStatus(function (response) {
//       if (response.status != "connected") {
//         FB.login(function (response) {
//           if (response.authResponse) {
//             console.log("Chào Mừng Bạn! Đã Đăng Nhập. ");
//             FB.api("/me", { fields: "name, email, id" }, function (response) {
//               Swal.fire({
//                 icon: "success",
//                 title: "Bạn sẽ được chuyển tiếp, đợi xíu nhaa....",
//                 text: `Chào Mừng Bạn! ${response.name}`,
//               });
//               const idFb = response.id;
//               console.log(idFb);
//               loginApi(idFb);
//             });
//           } else {
//             console.log("Người dùng đã hủy đăng nhập.");
//           }
//         }, true);
//       } else {
//         console.log("Đã đăng nhập");
//         FB.api("/me", { fields: "name, email, id" }, function (response) {
//           Swal.fire({
//             icon: "success",
//             title: "Bạn sẽ được chuyển tiếp, đợi xíu nhaa....",
//             text: `Chào Mừng Bạn! ${response.name}`,
//           });
//           const idFb = response.id;
//           console.log(idFb);
//           loginApi(idFb);
//         });
//       }
//     });
//   });
// };

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/vi_VN/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

async function loginApi(id) {
  try {
    const url = "https://dotstudio.demondev.games/api/loginpayment?token=" + id;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Lỗi kết nối API");
    }

    const data = await response.json();
    if (data.success) {
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
