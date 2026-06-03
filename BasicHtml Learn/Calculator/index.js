function appendToDisplay(value) {
  const element = document.getElementById("display");
  if (element.value === "0") {
    element.value = value;
  } else {
    element.value += value;
  }
}

function calculate() {
  try {
    const result = eval(document.getElementById("display").value);
    document.getElementById("display").value = result;
  } catch (error) {
    document.getElementById("display").value = "Error";
  }
}

function clearDisplay() {
  document.getElementById("display").value = "";
  document.getElementById("display").value = "0";
}

function backspace() {
  const display = document.getElementById("display");

  display.value = display.value.slice(0, -1);
  if (display.value === "") {
    display.value = "0";
  }
}

document.addEventListener("keydown", function (event) {
  const key = event.key;
  if ((key >= "0" && key <= "9") || ["+", "-", "*", "/", "%"].includes(key)) {
    appendToDisplay(key);
  } else if (key === "Enter") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    event.preventDefault();
    const display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
    if (display.value === "") {
      display.value = "0";
    }
  }
});
