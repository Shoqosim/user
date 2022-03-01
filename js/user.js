
// this code is registration confirmation code

const token = window.localStorage.getItem('token');

if(!token){
    window.location.replace('index.html')
}


// calling the HTML document elements 

const elUserlist = document.querySelector('.users_list');
const elUsersTemplate = document.querySelector('.users_template').content;
const elLogOut = document.querySelector('.log_out');

// this code is render users page 

const renderUsers = (arr, node)=> {

    node.innerHTML = null;

    const userFragmet = document.createDocumentFragment()

    arr.forEach((row)=>{
            const userTemplate = elUsersTemplate.cloneNode(true);

            userTemplate.querySelector('.user_username').textContent = row.username;
            userTemplate.querySelector('.user_name').textContent = row.name;
            userTemplate.querySelector('.user_company-name').textContent = row.company.name;
            userTemplate.querySelector('.users_address').textContent = row.address.street + '.'
            + row.address.suite + ' '+ row.address.city +' ' +row.address.zipcode
            userTemplate.querySelector('.user_company-catchPhrase').textContent = row.company.catchPhrase;
            userTemplate.querySelector('.user_email').textContent =row.email;
            userTemplate.querySelector('.user_email').href ='mailto:' + row.email;
            userTemplate.querySelector('.post_button').textContent = 'POSTS';
            userTemplate.querySelector('.post_button').type = 'submit';
            userTemplate.querySelector('.post_button').dataset.userId = row.id;
            userTemplate.querySelector('.users_tel-number').textContent = row.phone;
            userTemplate.querySelector('.users_tel-number').href ='tel'+ row.phone;
            userTemplate.querySelector('.number').textContent = row.id;
            

            userFragmet.appendChild (userTemplate)

    })

    node.appendChild(userFragmet)
}

// this code is fetch users entpoints

fetch ('https://jsonplaceholder.typicode.com/users')
.then((response)=>response.json())
.then((data)=>{

    if(data?.length>0){
        
        renderUsers(data,elUserlist)

    }
})


// this code is listen rendered users list

elUserlist.addEventListener('click' , (evt)=>{

    evt.preventDefault();
    
    const clickPostButton = evt.target.matches('.post_button');

    if(clickPostButton){
         
        window.localStorage.setItem('userId',evt.target.dataset.userId)
        window.location.replace('post.html');
    }

})


elLogOut.addEventListener('click',(evt)=>{

    evt.preventDefault();
    if(evt.target.matches('.log_out')){
        window.localStorage.removeItem('.token')
        window.location.replace('index.html')
    }

    
})