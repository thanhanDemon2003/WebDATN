window.onload = () => {
  const stt = localStorage.getItem("stt");
  console.log("stt", stt);
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const [gg, name, accessToken, tokenType] = [
    fragment.get("idgg"),
    fragment.get("name"),
    fragment.get("access_token"),
    fragment.get("token_type"),
  ];
  console.log("fragment>", fragment);
  if (gg != null) {
    console.log("userGG>", gg, name);
    LoginwithGoogle(stt, gg, name);
  } else if (accessToken != null) {
    console.log("discord nè");
    loginwithDiscord(stt, accessToken, tokenType);
  } else {
    window.location.href = "/loginpayment";
  }
};
function loginwithDiscord(stt, accessToken, tokenType) {
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
      loginApiDiscord(stt, id, global_name);
      console.log(global_name);
    })
    .catch(console.error);
}
async function LoginwithGoogle(stt, gg, name) {
  console.log("LoginwithGoogle", gg);
  try {
    const url =
      "/api/pushdatauser?stt=" +
      stt +
      "&token=" +
      gg +
      "&method=google&name=" +
      name;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!response.ok) {
      throw new Error("Lỗi kết nối API");
    }
    const data = await response.json();
    if (data.success === true) {
      console.log(data);
    } else if (data.error === true) {
      console.log(data);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "lỗi xin vui lòng đăng nhập lại",
        confirmButtonText: "OK",
        preConfirm: () => {
          window.location.href = "/logingame";
        },
      });
      setTimeout(() => {
        window.location.href = "/logingame";
      }, 5000);
    } else {
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
async function loginApiDiscord(stt, id, global_name) {
  try {
    const url =
      "/api/pushdatauser?stt=" +
      stt +
      "&token=" +
      id +
      "&method=discord&name=" +
      global_name;
    const response = await fetch(url,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response.ok) {
      throw new Error("Lỗi kết nối API");
    }
    const data = await response.json();
    if (data.success === true) {
      console.log(data);
    } else if (data.error === true) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "lỗi xin vui lòng đang nhập lại",
        confirmButtonText: "OK",
        preConfirm: () => {
          window.location.href = "/logingame";
        },
      });
      setTimeout(() => {
        window.location.href = "/logingame";
      }, 5000);
    } else {
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
window.onunload = () => {
  localStorage.removeItem("stt");
  localStorage.clear();
};
