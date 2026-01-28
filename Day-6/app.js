const API = "https://jsonplaceholder.typicode.com"
let page = 1
const limit = 10
let posts = []
let users = []
let comments = []
let term = ""
let mode = "full"
const feed = document.getElementById("feed")
async function load() {
  feed.innerHTML = "Loading..."
  const [p, u, c] = await Promise.all([
    fetch(`${API}/posts?_page=${page}&_limit=${limit}`).then(r => r.json()),
    fetch(`${API}/users`).then(r => r.json()),
    fetch(`${API}/comments`).then(r => r.json())
  ])
  posts = p
  users = u
  comments = c
  applyPipeline()
}

let timer = null
function onSearchInput(event) {
  clearTimeout(timer)
  timer = setTimeout(searchNow, 400)
}
function searchNow() {
  const input = document.getElementById("search")
  term = input.value.toLowerCase()
  applyPipeline()
}
document.getElementById("search").oninput = onSearchInput
document.getElementById("mode").onchange = e => {
  mode = e.target.value
  applyPipeline()
}
function applyPipeline() {
  let data = [...posts]
  data = search(data)
  data = highlight(data)
  data = sortByComments(data)
  render(data)
}
function search(data){
  if (!term){
    return data
  }
  return data.filter(p => {
    const user = users.find(u => u.id === p.userId)?.name.toLowerCase()
    if (mode === "title") return p.title.includes(term)
    if (mode === "fuzzy") return p.title.split("").some(c => term.includes(c))
    return p.title.includes(term) || p.body.includes(term) || user?.includes(term)
  })
}

function highlight(data) {
  return document.getElementById("long").checked
    ? data.map(ele => ({
        ...ele, h: ele.body.length > 120 
    }))
    : data
}

function sortByComments(data) {
  if(!document.getElementById("sort").checked){
    return data
  }
  const map = comments.reduce((acc, curr) => {
    acc[curr.postId] = (acc[curr.postId] || 0) + 1
    return acc
  }, {})
  return [...data].sort((a, b) => (map[b.id] || 0) - (map[a.id] || 0))
}

function render(data) {
  feed.innerHTML = data.length ? "" : "No posts"
  data.forEach(ele => {
    const div = document.createElement("div")
    div.className = `post ${ele.h ? "highlight" : ""}`
    div.innerHTML = `<h4>${ele.title}</h4><p>${ele.body.slice(0,90)}...</p>`
    div.onclick = () => open(ele.id)
    feed.appendChild(div)
  })
  document.getElementById("page").innerText = `Page ${page}`
}
async function open(id) {
  const modal = document.getElementById("modal")
  modal.classList.remove("hidden")
  modal.innerHTML = "Loading..."
  const [post, comm] = await Promise.all([
    fetch(`${API}/posts/${id}`).then(r => r.json()),
    fetch(`${API}/comments?postId=${id}`).then(r => r.json())
  ])
  const user = users.find(u => u.id === post.userId)
  modal.innerHTML = `
    <div>
      <h3>${post.title}</h3>
      <b>${user.name}</b>
      <p>${post.body}</p>
      <h4>Comments (${comm.length})</h4>
      ${comm.map(ele => `<p>${ele.body}</p>`).join("")}
      <button onclick="closeModal()">Close</button>
    </div>
  `
}
function closeModal() {
  document.getElementById("modal").classList.add("hidden")
}
document.getElementById("next").onclick = () => {
  page++; 
  load() 
}
document.getElementById("prev").onclick = () => { 
  if(page > 1){
  page--; 
  load() 
  } 
}
load()
