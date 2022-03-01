// this code is registration confirmation code
const token = window.localStorage.getItem('token');

if(!token){
    window.location.replace('index.html')
}


// calling the HTML document elements 

const elPostsList = document.querySelector('.posts_list');
const elPostsTemplate =document.querySelector('.posts_template').content;
const userId = window.localStorage.getItem('userId')
const elPreviousImage = document.querySelector('.previous_image');
const elPostsLogOut = document.querySelector('.log_out')

// this code is go to previous page

elPreviousImage.addEventListener(('click'),(evt)=>{

    evt.preventDefault();

    if(evt.target.matches('.previous_image')){
        
        window.location.replace('user.html');
    }
})

let Posts = [];

//  this code is render users page 

const renderPosts = (arr,node)=>{
    node.innerHTML = null;

    const postFragmet = document.createDocumentFragment();

    arr.forEach((row)=>{
        const cloneTemplatePosts=elPostsTemplate.cloneNode(true);
        
        cloneTemplatePosts.querySelector('.comments_button').textContent = 'COMMENTS';
        cloneTemplatePosts.querySelector('.comments_button').dataset.idbtn = row.id;
        cloneTemplatePosts.querySelector('.users_posts-headding').textContent =row.title;
        cloneTemplatePosts.querySelector('.users_posts-desc').textContent =row.body;
        
        postFragmet.appendChild(cloneTemplatePosts);
    })

    node.appendChild(postFragmet);
}


// this code is fetch posts entpoint
fetch('https://jsonplaceholder.typicode.com/posts/')
.then((response)=>response.json())
.then((data)=>{

    if(data?.length>0){

        Posts=data.filter((post)=>post.userId==userId)
        
        renderPosts(Posts,elPostsList )
    }
})

// this code is listen rendered posts list

elPostsList.addEventListener('click' , (evt)=>{

    evt.preventDefault();
    
    const clickCommentButton = evt.target.matches('.comments_button');

    if(clickCommentButton){

        window.localStorage.setItem('postId',evt.target.dataset.idbtn)
        window.location.replace('comment.html');

    }

})

elPostsLogOut.addEventListener('click',(evt)=>{

    evt.preventDefault();
    if(evt.target.matches('.log_out')){
        window.localStorage.removeItem('.token')
        window.location.replace('index.html')
    }
})