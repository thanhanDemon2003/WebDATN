const spans = document.querySelectorAll(".napthe-title");

spans[0].classList.add("selected");

let selectedSpan = spans[0];

spans.forEach((span) => {
  span.addEventListener("click", () => {
    if (selectedSpan) {
      selectedSpan.classList.remove("selected");
    }

    selectedSpan = span;
    span.classList.add("selected");
  });
});

const input = document.getElementById("ipVnd");
const error = document.getElementById("errIp");
function checkValueInputAmount (){
  let valuecheck = input.value;
  valuecheck = valuecheck.replace(/\./g, "");
  if (parseInt(valuecheck) < 20000) {
    error.innerText = "Số tiền phải lớn hơn 20,000";
    return;
  } else if (parseInt(valuecheck) > 50000000) {
    error.innerText = "Số tiền phải nhỏ hơn 50,000,000";
    return;
  } else if (/[a-zA-Z]/.test(valuecheck)) { 
    input.value = "";
    error.innerText = "Số tiền không được chứa chữ cái";
    return;
  } else {
    error.innerText = "";
    return;
  }
}
input.addEventListener("focusout", () => {
  checkValueInputAmount()
});
let amount

input.addEventListener("input", () => {
  let value = input.value;

  value = value.replace(/\./g, "");

  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  input.value = value;

  value = value.replace(/\./g, "");

  amount = parseInt(value);
  console.log(amount);

  calculateXu(amount);
});
const dotcoin = document.getElementById("dotcoin");

function calculateXu(amount) {
console.log(amount);
if (isNaN(amount)) {
    dotcoin.innerText = 0;
    return;
}
  if(amount < 20000) {
    dotcoin.innerText = 0;
    return;
  }

  let xu = amount * 0.005;

  dotcoin.innerText = Math.round(xu);

  if(amount >= 50000 && amount <= 100000){
    xu += 10; 
  }

  if(amount > 100000){
    xu += 30;
  }
  if(amount > 200000){
    xu += 50;
  }
  if(amount > 500000){
    xu += 70;
  }
  if(amount > 1000000){
    xu += 100;
  }

  dotcoin.innerText = Math.round(xu);

}
const btn = document.getElementById("btn-Payment");

btn.addEventListener("click", async () => {
    checkValueInputAmount();
    const value = input.value;
    amount = value.replace(/\./g, "");
    const id = btn.getAttribute("data-id");
  Swal.fire({
    icon: "warning",
    title: "Bạn sẽ được chuyển tiếp, đợi xíu nhaa....",
    text: `Chào Mừng Bạn!`,
  });
  fetch("/api/paymentvietqr", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Number(amount),
      id_Player: "654154c02ce6be3e6b068595"
    }),
  })
  .then(res => res.json())
  .then(data => {
      console.log("api đã về");
      window.location.href = data.checkoutUrl;
    }).catch((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lỗi kết nối API",
      });
    })
})