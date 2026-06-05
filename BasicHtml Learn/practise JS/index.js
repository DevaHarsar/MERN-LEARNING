// console.log("hi");
// console.log(10+10);

// console.log(10+"10"-2);

// let b=10;
// const a=20;
// b=30;
// var c=30;
// console.log(a+" "+b+" "+c);

// let num=0;
// if(true){
//     let num=50;
//     console.log(num);

// }
// console.log(num);



// for(let i=0;i<5;i++){
//     console.log(i);
// }



// let fruits=["apple","banana","grapes"];
// for(let i of fruits){
//     console.log(i);
// }

// let values=[10,20,30,40,50];
// let sum =values.map((value)=>{
//     return value+10;
// });
// console.log(sum);

// sum=values.filter((value)=>{
//     return value%15===0;
// })

// sum=values.reduce((accumulator,currentValue)=>{
//     return accumulator+currentValue;
// })

// let userProfile={
//     name:"John",
//     age:30,
//     city:"New York",
//     workExperienceField:["Software Development","Project Management"],
// }

// userProfile={
//     ...userProfile,
//     from:"Coimbatore",
// }

// userProfile.workExperienceField.push("Data Analysis");
// console.log(userProfile.workExperienceField);

// userProfile.workExperienceField.splice(0,1);
// console.log(userProfile.workExperienceField);

// // userProfile.workExperienceField.pop();
// // console.log(userProfile.workExperienceField);

// userProfile.workExperienceField.unshift("Cyber Security");
// console.log(userProfile.workExperienceField);

// userProfile.workExperienceField.shift();
// console.log(userProfile.workExperienceField);


// userProfile.workExperienceField.forEach((value,index)=>{
//     console.log(index+" "+value);
// })





// console.log("Name:"+userProfile.name+"Age:"+userProfile.age+"City:"+userProfile.city+"Work Experience Field:"+userProfile.workExperienceField.join(", ")+"From:"+userProfile.from);

// console.log(userProfile);

// console.log(sum);



let arr=[10,20,30,40,50];
arr.push(60);
console.log(arr);

arr.pop();
console.log(arr);

arr.unshift(0);
console.log(arr);

arr.shift();
console.log(arr);

arr.push(60);
console.log(arr);

arr.splice(1,4,5,10,15);
console.log(arr);   

console.log(arr.includes(30));
console.log(arr.indexOf(40));
console.log(arr.lastIndexOf(60));
console.log(arr.find(x=>x>30));

console.log(arr.map(x=x=>x+1));
console.log(arr.filter(x=>x>30));
console.log(arr.reduce((acc,x)=>acc+x,0));

console.log(arr.sort((a,b)=>a-b));
console.log(arr.sort((a,b)=>b-a));

console.log(arr.reverse());

console.log(arr.slice(1,3));

let[a,b]=arr;
console.log(a+" "+b);

let[c,...rest]=arr;
console.log(rest);

let copy = [...arr];
console.log(copy);



const user={
    username:"Dev",
    email:"dev@example.com"
}

const{username,email}=user;
console.log(username+" "+email);

user.from="Coimbatore";

console.log(user);

console.log(Object.keys(user));

console.log(Object.values(user));

console.log(Object.entries(user));



