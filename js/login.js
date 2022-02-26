// calling the HTML document elements 

const elForm = document.querySelector('.form');
const elUsernameInput = document.querySelector('.username_input');
const elPasswordInput = document.querySelector('.password_input');

// this code is listen the form

elForm.addEventListener('submit', (evt)=>{
    evt.preventDefault();

    const usernameValue = elUsernameInput.value.trim();
    const passwordValue = elPasswordInput.value.trim();

    // this code is fetch login entpoint

    fetch('https://reqres.in/api/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },

        body:JSON.stringify({

            email: usernameValue,
            password: passwordValue,
        })
    })
    .then((response)=>response.json())
    .then ((data)=>{
        
        if(data?.token){

            window.localStorage.setItem('token', data.token)
            window.location.replace('user.html')
        }
    })
});