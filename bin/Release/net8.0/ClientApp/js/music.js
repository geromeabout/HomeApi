const uri ='api/Music';
let songs = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addTitleTextBox = document.getElementById('add-title');
    const addArtistTextBox = document.getElementById('add-artist');
    const addGenreTextBox = document.getElementById('add-genre');

    const item = {
        title: addTitleTextBox.value.trim(),
        artist: addArtistTextBox.value.trim(),
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
        addArtistTextBox.value = '';
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
    const item = todos.find(item => item.id == id);

    document.getElementById('edit-title').value = item.title;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-artist').value = item.artist;
    document.getElementById('edit-genre').value = item.genre;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        title: document.getElementById('edit-title').value.trim(),
        artist: document.getElementById('edit-artist').value.trim(),
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
    const name = (itemCount === 1) ? 'song' : 'songs';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('songs');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;
    
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