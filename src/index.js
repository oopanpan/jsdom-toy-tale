let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function loadSingleToy(toy){
  const collection = document.querySelector('#toy-collection')
  const newDiv = document.createElement('div')
  newDiv.className = 'card'
  newDiv.id = toy.id
  const name = document.createElement('h2')
  name.innerText = toy.name
  const imgTag = document.createElement('img')
  imgTag.src = toy.image
  imgTag.className = 'toy-avatar'
  const likes = document.createElement('p')
  likes.innerText = `${toy.likes} Likes`
  const button = document.createElement('button')
  button.innerText = 'Like <3'
  button.className = 'like-btn'
  const deleteButton = document.createElement('button')
  deleteButton.innerText = 'Delete'
  button.addEventListener('click', () => likeToy(toy))
  deleteButton.addEventListener('click', () => deleteToy(toy))
  newDiv.append(name, imgTag, likes, button, deleteButton);
  collection.appendChild(newDiv)
}

fetch('http://localhost:3000/toys')
.then(response => response.json())
.then(toys => {
  toys.forEach(toy =>{
    loadSingleToy(toy)
  })
})



const form = document.querySelector('form.add-toy-form')
form.addEventListener('submit',(e)=>{
  e.preventDefault()
  postToy(e.target)
})

function postToy(toy){
  fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "name": toy.name.value,
    "image": toy.image.value,
    "likes": 0
  }),
})
  .then(res => res.json())
  .then(toy => {
    loadSingleToy(toy)
  })
}

function likeToy(toy){
  toy.likes++
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes : toy.likes
    }),
  })
  .then(r => r.json())
  .then(toy => {
    let thisToy = document.querySelector(`div${toy.id}`)
    let p = thisToy.querySelector('p')
    p.innerText = `${toy.likes} Likes`
  })
  }

function deleteToy(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: 'DELETE'
  })
  .then(r => r.json())
  .then(() =>{
    let deletedToy = document.getElementById(toy.id)
    deletedToy.remove()
  })
}