function doubleNumber() {
    const arr = document.getElementById('numberInput').value.split(/[ ,;]+/).map(Number);
    document.getElementById('result').textContent = arr.map(num=>num*2).join(', ');
}