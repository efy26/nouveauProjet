let nom = document.getElementById('nom')
let postnom = document.getElementById('postnom')
let prenom = document.getElementById('prenom')
let pays = document.getElementById('pays')
let genre = document.getElementById('genre')
let git = document.getElementById('git')
let form = document.getElementById('form')
let tableBody = document.querySelector('table tbody')
let id = document.getElementById('ids')
let idInc = id+1

let iconAjout = `<div><i class="bi bi-person-plus-fill"></i></div>`
let iconModif = `<div><i class="bi bi-person-fill-dash"></i></div>`


let editMode = false
let editionTak = null
let submitBtn = document.getElementById('btnSubmit')


editModeEnabled(editMode)

let tasks = [
]

function loadTasksIntable() {
    tableBody.innerHTML = ''

    for (const task of tasks) {
        let temp = 
    `
        <tr>
            <td id="ids">${task.id}</td>
            <td>${task.nom}</td>
            <td>${task.postnom}</td>
            <td>${task.prenom}</td>
            <td>${task.pays}</td>
            <td>${task.genre}</td>
            <td>${task.git}</td>
            <td>
                <button onclick = "deleteTask(this, ${tasks.indexOf((task))})" class="btn btn-danger"><i class="bi bi-trash"></i></button>
                <button data-nom="${task.nom}" data-postnom="${task.postnom}" data-prenom="${task.prenom}" data-pays="${task.pays}" data-genre="${task.genre}"data-git="${task.git}" data-id="${task.id}" onclick = "editTask(this)" class="btn btn-warning"><i class="bi bi-pencil"></i></button>
            </td>	
        </tr>
    `

    tableBody.innerHTML += temp
    
    }
}
loadTasksIntable()

form.addEventListener('submit', function(e){
    e.preventDefault();
    
    let newNomValue = nom.value
    let newPostnomValue = postnom.value
    let newPrenomValue = prenom.value
    let newPaysValue = pays.value
    let newGenreValue = genre.value
    let newGitValue = git.value
    
    if (editMode) {
        updateTask(newNomValue, newPostnomValue, newPrenomValue, newPaysValue, newGenreValue, newGitValue)
        editMode = false
        submitBtn.innerHTML = iconAjout
        
    } else {
        addTask(newNomValue, newPostnomValue, newPrenomValue, newPaysValue, newGenreValue, newGitValue)
    }
    
    

})

function updateTask(value) {
    tasks.find((t) => t.id == editionTak.id).nom = nom.value
    tasks.find((t) => t.id == editionTak.id).postnom = postnom.value
    tasks.find((t) => t.id == editionTak.id).prenom = prenom.value
    tasks.find((t) => t.id == editionTak.id).pays = pays.value
    tasks.find((t) => t.id == editionTak.id).genre = genre.value
    tasks.find((t) => t.id == editionTak.id).git = git.value

    loadTasksIntable()
    

}

function addTask(value) {
    let newtask = {
        'id' : idInc++,
        'nom' : nom.value,
        'postnom' : postnom.value,
        'prenom' : prenom.value,
        'pays' : pays.value,
        'genre' : genre.value,
        'git' : git.value,
        'isdone' : false
    }

    tasks.push(newtask)
    loadTasksIntable()
    
}

function deleteTask(e, index) {
    tasks.splice(index, 1)
    loadTasksIntable()
}

function editTask(e) {
    editModeEnabled(true)
    nom.value = e.dataset.nom, 
    postnom.value = e.dataset.postnom, 
    prenom.value = e.dataset.prenom, 
    pays.value = e.dataset.pays, 
    genre.value = e.dataset.genre, 
    git.value = e.dataset.git

    editionTak = tasks.find((t) => t.id == e.dataset.id)
    console.log(editionTak)


}

function editModeEnabled(enabled) {
    if (enabled) {
        editMode = true
        submitBtn.innerHTML =iconModif
    }else {
        editMode = false
        submitBtn.innerHTML = iconAjout
        editionTak = null
        newtask = ''
    }
}