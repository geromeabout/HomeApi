const todoapi ='api/Todos';
let todos = [];

function getTodos()
{
    fetch(todoapi)
        .then(response => response.json())
        .then(data => _displayTodos(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addTodo()
{
    const addNameTextBox = document.getElementById('add-name');

    const item = {
        isComplete: false,
        name: addNameTextBox.value.trim()
    };

    fetch(todoapi, {
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(() => {
        getTodos();
        addNameTextBox.value = '';
    })
    .catch(error => console.error('Unable to add item', error));
}

function deleteTodo(id) {
    fetch(`${todoapi}/${id}`, {
        method: 'DELETE'
    })
    .then(() => getTodos())
    .catch(error => console.error('Unable to delete item', error));
}
function displayTodoEditForm(id) {
    const item = todos.find(item => item.id == id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-isComplete').checked = item.isComplete;
    document.getElementById('editForm').style.display = 'block';
}

function updateTodo() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('edit-isComplete').checked,
        name: document.getElementById('edit-name').value.trim()
    };

    fetch(`${todoapi}/${item.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(() => getTodos())
    .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeTodoInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayTodoCount(itemCount) {
    const name = (itemCount === 1) ? 'to-do' : 'to-dos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayTodos(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    _displayTodoCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;
    
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayTodoEditForm(${item.id})`);
    
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteTodo(${item.id})`);
    
        let tr = tBody.insertRow();
        
        let td1 = tr.insertCell(0);
        td1.appendChild(isCompleteCheckbox);
    
        let td2 = tr.insertCell(1);
        let textNode = document.createTextNode(item.name);
        td2.appendChild(textNode);
    
        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);
    
        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    todos = data;
}

const moviesapi ='api/Movies';
let movies = [];

function getMovies() {
    fetch(moviesapi)
        .then(response => response.json())
        .then(data => _displayMovies(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addMovie() {
    const addTitleTextBox = document.getElementById('add-title');
    const addActorTextBox = document.getElementById('add-actor');
    const addGenreTextBox = document.getElementById('add-genre');

    const item = {
        title: addTitleTextBox.value.trim(),
        actor: addActorTextBox.value.trim(),
        genre: addGenreTextBox.value.trim()
    };

    fetch(moviesapi, {
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(() => {
        getMovies();
        addTitleTextBox.value = '';
        addActorTextBox.value = '';
        addGenreTextBox.value = '';
    })
    .catch(error => console.error('Unable to add item', error));
}

function deleteMovie(id) {
    fetch(`${moviesapi}/${id}`, {
        method: 'DELETE'
    })
    .then(() => getMovies())
    .catch(error => console.error('Unable to delete item', error));
}

function displayMoviesEditForm(id) {
    const item = movies.find(item => item.id == id);

    document.getElementById('edit-title').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-actor').value = item.actor;
    document.getElementById('edit-genre').value = item.genre;
    document.getElementById('editForm').style.display = 'block';
}

function updateMovie() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        title: document.getElementById('edit-title').value.trim(),
        actor: document.getElementById('edit-actor').value.trim(),
        genre: document.getElementById('edit-genre').value.trim()
    };

    fetch(`${moviesapi}/${item.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(() => getMovies())
    .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeMovieInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayMovieCount(itemCount) {
    const name = (itemCount === 1) ? 'movie' : 'movies';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayMovies(data) {
    const tBody = document.getElementById('movies');
    tBody.innerHTML = '';

    _displayMovieCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {    
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayMovieEditForm(${item.id})`);
    
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteMovie(${item.id})`);
    
        let tr = tBody.insertRow();
        
        let td1 = tr.insertCell(0);
        let titleNode = document.createTextNode(item.title);
        td1.appendChild(titleNode);
    
        let td2 = tr.insertCell(1);
        let actorNode = document.createTextNode(item.actor);
        td2.appendChild(actorNode);
    
        let td3 = tr.insertCell(2);
        let genreNode = document.createTextNode(item.genre);
        td3.appendChild(genreNode);
    
        let td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);
    });

    movies = data;
}

const musicapi ='api/Music';
let songs = [];

function getSongs() {
    fetch(musicapi)
        .then(response => response.json())
        .then(data => _displaySongs(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addSong() {
    const addTitleTextBox = document.getElementById('add-title');
    const addArtistTextBox = document.getElementById('add-artist');
    const addGenreTextBox = document.getElementById('add-genre');

    const item = {
        title: addTitleTextBox.value.trim(),
        artist: addArtistTextBox.value.trim(),
        genre: addGenreTextBox.value.trim()
    };

    fetch(musicapi, {
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(() => {
        getSongs();
        addTitleTextBox.value = '';
        addArtistTextBox.value = '';
        addGenreTextBox.value = '';
    })
    .catch(error => console.error('Unable to add item', error));
}

function deleteSong(id) {
    fetch(`${musicapi}/${id}`, {
        method: 'DELETE'
    })
    .then(() => getSongs())
    .catch(error => console.error('Unable to delete item', error));
}

function displayMusicEditForm(id) {
    const item = songs.find(item => item.id == id);

    document.getElementById('edit-title').value = item.title;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-artist').value = item.artist;
    document.getElementById('edit-genre').value = item.genre;
    document.getElementById('editForm').style.display = 'block';
}

function updateMusic() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        title: document.getElementById('edit-title').value.trim(),
        artist: document.getElementById('edit-artist').value.trim(),
        genre: document.getElementById('edit-genre').value.trim()
    };

    fetch(`${musicapi}/${item.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(() => getSongs())
    .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeMusicInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayMusicCount(itemCount) {
    const name = (itemCount === 1) ? 'song' : 'songs';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displaySongs(data) {
    const tBody = document.getElementById('songs');
    tBody.innerHTML = '';

    _displayMusicCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;
    
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayMusicEditForm(${item.id})`);
    
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteSong(${item.id})`);
    
        let tr = tBody.insertRow();
        
        let td1 = tr.insertCell(0);
        let titleNode = document.createTextNode(item.title);
        td1.appendChild(titleNode);
    
        let td2 = tr.insertCell(1);
        let artistNode = document.createTextNode(item.artist);
        td2.appendChild(artistNode);

        let td3 = tr.insertCell(2);
        let genreNode = document.createTextNode(item.genre);
        td3.appendChild(genreNode);
    
        let td4 = tr.insertCell(4);
        td4.appendChild(editButton);
    
        let td5 = tr.insertCell(5);
        td5.appendChild(deleteButton);
    });

    songs = data;
}