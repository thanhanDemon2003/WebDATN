window.fbAsyncInit = function () {
  FB.init({
    appId: "317289147672827",
    xfbml: true,
    version: "v18.0",
  });
 FB.AppEvents.logPageView();
}
 const facebookLogin = document.getElementById("loginfbne");
  facebookLogin.addEventListener('click', function () {
    console.log('click');
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
  });
})
async function loginApi(id) {
  try {
    const url =
  "https://dotstudio.demondev.games/api/loginpayment?token=" + id;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Lỗi kết nối API");
    }

    const data = await response.json();
    const user = data.data;
    if (data.success) {
      window.location.href = "/payment?"+ user.id;
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