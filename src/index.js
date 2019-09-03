const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
document.addEventListener("DOMContentLoaded",main)

function main(){
  fetchToys()

  let createForm = document.getElementsByClassName("add-toy-form")[0]
  createForm.addEventListener("submit", e => {
    e.preventDefault()
    addNewToy(e)
  })

}

function fetchToys(){
  return fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(json => generateToys(json))
}

function generateToys(arrayOfToys){
  let toyCollectionDiv = document.getElementById("toy-collection")
  arrayOfToys.forEach(function(toy){
    let toyCardDiv = document.createElement("div")
    toyCardDiv.className = "card"

    let toyNameH2 = document.createElement("h2")
    toyNameH2.innerText = toy.name

    let toyImg = document.createElement("img")
    toyImg.src = toy.image
    toyImg.className = "toy-avatar"

    let toyLikesP = document.createElement("p")
    toyLikesP.innerText = `${toy.likes} Likes`
    toyLikesP.id = toy.id

    let likeButton = document.createElement("button")
    likeButton.className = "like-btn"
    likeButton.innerText = "Like <3"
    likeButton.addEventListener("click",addLikes(toy))

    toyCardDiv.appendChild(toyNameH2)
    toyCardDiv.appendChild(toyImg)
    toyCardDiv.appendChild(toyLikesP)
    toyCardDiv.appendChild(likeButton)
    toyCollectionDiv.appendChild(toyCardDiv)
  })
}

function addNewToy(e){
  fetch('http://localhost:3000/toys',{
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      name: e.target[0].value,
      image: e.target[1].value,
      likes: 0
    })
  }).then(response => response.json())
  .then(json => generateToys([json]))
}

function addLikes(toy){
  return function(e){
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        likes: ++toy.likes
      })
    }).then(response => response.json())
    .then(json => renderLikes(json))
  }
}

function renderLikes(toy){
  let toyLikes = document.getElementById(toy.id)
  toyLikes.innerText = `${toy.likes} Likes`
}