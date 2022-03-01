
// this code is registration confirmation code

const token = window.localStorage.getItem('token');

if(!token){
    window.location.replace('index.html')
}

// calling the HTML document elements 

const elCommentsList = document.querySelector('.comments_list');
const elCommentsTemplate =document.querySelector('.comments_template').content;
const commentId = window.localStorage.getItem('postId')
const elPreviousImage = document.querySelector('.previous_image');
const elCommentsLogOut = document.querySelector('.log_out');

// this code is go to previous page

elPreviousImage.addEventListener(('click'),(evt)=>{
    evt.preventDefault();

    if(evt.target.matches('.previous_image')){
        
        window.location.replace('post.html');
    }
})

// this code 
const renderComments = (arr,node)=>{

    node.innerHTML = null;

    const commentFragmet = document.createDocumentFragment();

    arr.forEach((row)=>{
        const cloneTemplateComments=elCommentsTemplate.cloneNode(true);
        
        cloneTemplateComments.querySelector('.users_comments-headding').textContent =row.name;
        cloneTemplateComments.querySelector('.users_comments-desc').textContent =row.body;
        cloneTemplateComments.querySelector('.users_email').textContent = row.email;
        cloneTemplateComments.querySelector('.users_email').href ='mailto:' +row.email;
        
        commentFragmet.appendChild(cloneTemplateComments);
    })

    node.appendChild(commentFragmet);
}

// this code is fetch comments entpoint
fetch('https://jsonplaceholder.typicode.com/comments?postId='+ commentId)
.then((response)=>response.json())
.then((data)=>{
    console.log(data);

    if(data?.length>0){
        
        renderComments(data,elCommentsList )
    }
})

// this code is to do log out 
elCommentsLogOut.addEventListener('click',(evt)=>{

    evt.preventDefault();
    if(evt.target.matches('.log_out')){
        window.localStorage.removeItem('.token')
        window.location.replace('index.html')
    }
})