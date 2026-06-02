console.log("hi");
console.log(10+10);

console.log(10+"10"-2);

let b=10;
const a=20;
b=30;
var c=30;
console.log(a+" "+b+" "+c);

let num=0;
if(true){
    let num=50;
    console.log(num);

}
console.log(num);



for(let i=0;i<5;i++){
    console.log(i);
}



let fruits=["apple","banana","grapes"];
for(let i of fruits){
    console.log(i);
}

let values=[10,20,30,40,50];
let sum =values.map((value)=>{
    return value+10;
});
console.log(sum);

sum=values.filter((value)=>{
    return value%15===0;
})

sum=values.reduce((accumulator,currentValue)=>{
    return accumulator+currentValue;
})



console.log(sum);