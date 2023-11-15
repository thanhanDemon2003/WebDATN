const spans = document.querySelectorAll(".napthe-title");

spans[0].classList.add("selected");

let selectedSpan = spans[0];
let selectedMethod = "payWithPayOS";
spans.forEach((span) => {
  span.addEventListener("click", function () {
    if (selectedSpan) {
      selectedSpan.classList.remove("selected");
    }

    selectedSpan = span;
    selectedMethod = this.dataset.method;
    console.log(selectedMethod, "method");
    span.classList.add("selected");
  });
});

const input = document.getElementById("ipVnd");
const error = document.getElementById("errIp");
let checkerrPayment = false;
function checkValueInputAmount() {
  let valuecheck = input.value;
  valuecheck = valuecheck.replace(/\./g, "");
  if (parseInt(valuecheck) < 20000) {
    error.innerText = "Số tiền phải lớn hơn 20,000";
    console.log(checkerrPayment, "test1");
    checkerrPayment = true;
  } else if (parseInt(valuecheck) > 50000000) {
    error.innerText = "Số tiền phải nhỏ hơn 50,000,000";
    checkerrPayment = true;
    console.log(checkerrPayment, "test2");
  } else if (/[a-zA-Z]/.test(valuecheck)) {
    input.value = "";
    error.innerText = "Số tiền không được chứa chữ cái";
    checkerrPayment = true;
    console.log(checkerrPayment, "test3");
  } else {
    error.innerText = "";
    console.log(checkerrPayment, "test4");
    checkerrPayment = false;
  }
}
input.addEventListener("focusout", () => {
  checkValueInputAmount();
});
let amount;

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
  if (amount < 20000) {
    dotcoin.innerText = 0;
    return;
  }

  let xu = amount * 0.005;

  dotcoin.innerText = Math.round(xu);

  if (amount >= 50000 && amount <= 100000) {
    xu += 10;
  }

  if (amount > 100000) {
    xu += 30;
  }
  if (amount > 200000) {
    xu += 50;
  }
  if (amount > 500000) {
    xu += 70;
  }
  if (amount > 1000000) {
    xu += 100;
  }

  dotcoin.innerText = Math.round(xu);
}
buttonPayment.addEventListener("click", async (e) => {
  const value = input.value;
  amount = value.replace(/\./g, "");
  if (checkerrPayment == true) {
    console.log(checkerrPayment);
    Swal.fire({
      icon: "warning",
      title: "Thông báo...",
      text: "Kiểm tra lại số tiền trước thi thanh toán",
    });
    return;
  }
  if (amount < 20000 || amount > 50000000 || amount == undefined) {
    Swal.fire({
      icon: "warning",
      title: "Thông báo...",
      text: "Kiểm tra lại số tiền trước thi thanh toán",
    });
    return;
  }
  Swal.fire({
    icon: "warning",
    title: "Bạn sẽ được chuyển tiếp, đợi xíu nhaa....",
    text: `Chào Mừng Bạn!`,
  });
  const method = selectedMethod;
  if (method === "payWithPayOS") {
    payWithPayOS(amount);
  }

  if (method === "payWithZaloPay") {
    payWithZaloPay(amount);
    console.log(userId);

    console.log("Gọi ZaloPay Nè", amount);
  }
  if (method === "payWithVisaCard") {
    console.log("Gọi Visa Nè", amount);
    // payWithVisaCard(amount);
  }
});
async function payWithPayOS(amount) {
  console.log(userId);
  fetch("/api/paymentvietqr", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Number(amount),
      id_Player: userId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      par = JSON.parse(data.data);
      window.location.href = par.data.checkoutUrl;
    })
    .catch((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lỗi kết nối API",
      });
    });
}
async function payWithZaloPay(amount) {
  console.log(userId);
  console.log(amount);
  fetch("/api/paymentZaloPay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Number(amount),
      idPlayer: userId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      par = JSON.parse(data.data);
      console.log(par);
      window.location.href = par.order_url;
    })
    .catch((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lỗi kết nối API",
      });
    });
}
