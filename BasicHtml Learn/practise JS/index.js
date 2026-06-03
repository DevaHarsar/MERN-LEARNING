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

let userProfile={
    name:"John",
    age:30,
    city:"New York",
    workExperienceField:["Software Development","Project Management"],
}

userProfile={
    ...userProfile,
    from:"Coimbatore",
}

userProfile.workExperienceField.push("Data Analysis");
console.log(userProfile.workExperienceField);

userProfile.workExperienceField.splice(0,1);
console.log(userProfile.workExperienceField);

// userProfile.workExperienceField.pop();
// console.log(userProfile.workExperienceField);

userProfile.workExperienceField.unshift("Cyber Security");
console.log(userProfile.workExperienceField);

userProfile.workExperienceField.shift();
console.log(userProfile.workExperienceField);


userProfile.workExperienceField.forEach((value,index)=>{
    console.log(index+" "+value);
})





console.log("Name:"+userProfile.name+"Age:"+userProfile.age+"City:"+userProfile.city+"Work Experience Field:"+userProfile.workExperienceField.join(", ")+"From:"+userProfile.from);

console.log(userProfile);

console.log(sum);