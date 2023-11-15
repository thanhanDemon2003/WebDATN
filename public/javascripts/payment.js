const buttonPayment = document.getElementById("btn-Payment");
var userId;
window.onload = () => {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const [gg, accessToken, tokenType] = [
    fragment.get("idgg"),
    fragment.get("access_token"),
    fragment.get("token_type"),
  ];
  console.log("fragment>", fragment);
  const currentUrl = document.URL;
  localStorage.setItem("currentPaymentUrl", currentUrl);
  if(gg != null){
    console.log('userGG>', gg);
    LoginwithGoogle(gg);
  }else if (accessToken != null){
    console.log("discord nè");
    loginwithDiscord(accessToken, tokenType);
  }
};
function loginwithDiscord (accessToken, tokenType){
  console.log("loginwithDiscord", accessToken, tokenType);
  fetch("https://discord.com/api/users/@me", {
    headers: {
      authorization: `${tokenType} ${accessToken}`,
    },
  })
    .then((result) => result.json())
    .then((response) => {
      console.log(response);
      const { global_name, id } = response;
      loginApiDiscord(id);
      console.log(global_name);
      document.getElementById("user").innerText = ` ${global_name}`;
    })
    .catch(console.error);
}
async function LoginwithGoogle(gg) {
  console.log("LoginwithGoogle", gg);
  try {
    const url = "/api/loginpayment?token=" + gg;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Lỗi kết nối API");
    }
    const data = await response.json();
    if (data.success === true) {
      console.log(data.user);
       userId = data.user;
       document.getElementById("user").innerText = ` ${data.name}`;
    }else if (data.error === true) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.notification,
        confirmButtonText: "OK",
        preConfirm: () => {
          window.location.href = "/loginpayment";
        },
      });
      setTimeout(() => {
        window.location.href = "/loginpayment";
      }, 5000);
    }else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lỗi kết nối API",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
async function loginApiDiscord(id) {
  try {
    const url = "/api/loginpaymentdiscord?id=" + id;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Lỗi kết nối API");
    }
    const data = await response.json();
    if (data.success === true) {
      console.log(data.user);
       userId = data.user;
    }else if (data.error === true) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.notification,
        confirmButtonText: "OK",
        preConfirm: () => {
          window.location.href = "/loginpayment";
        },
      });
      setTimeout(() => {
        window.location.href = "/loginpayment";
      }, 5000);
    }else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lỗi kết nối API",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
function LogOut() {
  localStorage.removeItem("currentPaymentUrl");
  window.location.href = "/loginpayment";
}
