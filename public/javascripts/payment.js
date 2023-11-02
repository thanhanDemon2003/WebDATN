window.addEventListener("load", async function () {

  var code = getUrlParameter("code");

  var facebookAppId = "317289147672827";

  var redirectUrl = "https://thanhan.andemongame.tech/tes/PayWeb/index.html";
  var client_secret = "3091a17698a1c463a58950500b0cf329"
  var redirectUrl = "https://thanhan.andemongame.tech/tes/PayWeb/index.html";
  var client_secret = "3091a17698a1c463a58950500b0cf329"
   fetch("https://graph.facebook.com/oauth/access_token?" +
  "client_id=" +
  facebookAppId +
  "&redirect_uri=" +
  encodeURIComponent(redirectUrl) +
  "&client_secret="+ client_secret +
  "&code=" +
  code, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Headers": "Content-Type"
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    
console.log(token);
  // fetch(`https://gamedatn.andemongame.tech/games/Login?token=${token}`,{
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
});
function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
}
