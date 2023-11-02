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

input.addEventListener("focusout", () => {
  let valuecheck = input.value;
  valuecheck = valuecheck.replace(/\./g, "");
  if (parseInt(valuecheck) < 20000) {
    error.innerText = "Số tiền phải lớn hơn 20,000";
  } else if (parseInt(valuecheck) > 50000000) {
    error.innerText = "Số tiền phải nhỏ hơn 50,000,000";
  } else if (/[a-zA-Z]/.test(valuecheck)) {
    input.value = "";
    error.innerText = "Số tiền không được chứa chữ cái";
  } else {
    error.innerText = "";
  }
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

