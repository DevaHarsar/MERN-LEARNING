function findLargestNumber(){
    const arr = document.getElementById("input").value.split(/[,\s]+/).map(Number);


    if(arr.some(isNaN)){
        alert("Please enter valid numbers separated by commas or spaces.");
        return;
    }

    let largest = arr[0];
    for(let i=1;i<arr.length;i++){
        if(arr[i]>largest){
            largest = arr[i];
        }
    }
    console.log(largest);

    document.getElementById("result").textContent = "Largest Number: " + largest;
    return largest;
}