

const num1 =  document.getElementById("num1");
const num2 =  document.getElementById("num2");

document.getElementById("addBtn").addEventListener("click", () => {
    const res = (num1,num2)=>Number(num1)+Number(num2);
    document.getElementById("result").textContent = `Result: ${res(num1.value,num2.value)}`;
});