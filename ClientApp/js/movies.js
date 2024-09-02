const uri ='api/Movies';
let movies = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addTitleTextBox = document.getElementById('add-title');
    const addActorTextBox = document.getElementById('add-actor');
    const addGenreTextBox = document.getElementById('add-genre');

    const item = {
        title: addTitleTextBox.value.trim(),
        actor: addActorTextBox.value.trim(),
        genre: addGenreTextBox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(() => {
        getItems();
        addTitleTextBox.value = '';
        addActorTextBox.value = '';
        addGenreTextBox.value = '';
    })
    .catch(error => console.error('Unable to add item', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
    .then(() => getItems())
    .catch(error => console.error('Unable to delete item', error));
}

function displayEditForm(id) {
    const item = movies.find(item => item.id == id);

    document.getElementById('edit-title').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-actor').value = item.actor;
    document.getElementById('edit-genre').value = item.genre;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        title: document.getElementById('edit-title').value.trim(),
        actor: document.getElementById('edit-actor').value.trim(),
        genre: document.getElementById('edit-genre').value.trim()
    };

    fetch(`${uri}/${item.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(() => getItems())
    .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'movie' : 'movies';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('movies');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {    
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);
    
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);
    
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