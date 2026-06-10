const container = document.getElementById('userContainer');
async function fetchUsers(){
    let users = await fetch('https://jsonplaceholder.typicode.com/users');
    users = await users.json();
    console.log(users);
    users.forEach(user =>{
        const userElement = document.createElement('div');
        userElement.innerHTML = `<h3>${user.name}</h3>
        <p>Email: ${user.email}</p>
        <p>Phone: ${user.phone}</p>
        <p>Website: ${user.website}</p>
        `;
        container.appendChild(userElement);

        userElement.classList.add('user-card');
    })
}


