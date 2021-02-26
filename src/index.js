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

const collection = document.querySelector('#toy-collection')

function loadSingleToy(toy){
  const newDiv = document.createElement('div')
  newDiv.className = 'card'
  const name = document.createElement('h2')
  name.innerText = toy.name
  const imgTag = document.createElement('img')
  imgTag.src = toy.image
  imgTag.className = 'toy-avatar'
  const likes = document.createElement('p')
  likes.innerText = toy.likes
  const button = document.createElement('button')
  button.innerText = ' Delete '
  button.className = 'like-btn'
  newDiv.append(name, imgTag, likes, button);
  return newDiv
}

fetch('http://localhost:3000/toys')
.then(response => response.json())
.then(toys => {
  toys.forEach(toy =>{
    collection.appendChild(loadSingleToy(toy))
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
    "image": toy.image.value
  }),
})
  .then(res => res.json())
  .then(toy => {
    loadSingleToy(toy)
  })
}