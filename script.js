let songs = [];
let filteredSongs = [];  // Для зберігання результатів пошуку

async function fetchSongs() {
    try {
        const response = await fetch('http://localhost:3001/api/songs');
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        songs = await response.json(); 
        console.log(songs); 
        displaySongs(songs); 
        calculateAverageListens(); 
    } catch (error) {
        console.error('Не вдалося отримати пісні:', error);
    }
}

// Викликаємо функцію для завантаження пісень під час завантаження сторінки
fetchSongs();

function getImageForArtist(author) {
    const images = {
        "Twenty One Pilots": "images/twenty_one_pilots.jpg",
        "Onerepublic": "images/onerepublic.jpg",
        "Coldplay": "images/coldplay.jpg",
        "Скрябін": "images/skryabin.jpg",
        "Imagine Dragons": "images/imagine_dragons.jpg",
        "Антитіла": "images/antytila.jpg",
        "SadSvit": "images/sad_svit.jpg"
    };
    return images[author] || "images/default.jpg";
}

function createMusicCard(song, index) {
    const card = document.createElement('div');
    card.classList.add('music-card');
    card.dataset.duration = song.duration;
    card.dataset.popularity = song.listens;

    card.innerHTML = `
        <img src="${getImageForArtist(song.author)}" alt="${song.title}">
        <h3>${song.title}</h3>
        <p><strong>Author:</strong> ${song.author}</p>
        <p><strong>Listen count:</strong> ${song.listens}</p>
        <p><strong>Duration:</strong> ${song.duration} min</p>
        <div class="button-container">
            <button class="play-btn"><i class="fa fa-play"></i></button>
            <button class="edit-btn"><i class="fas fa-edit"></i></button>
            <button class="remove-btn"><i class="fas fa-trash-alt"></i></button>
        </div>
    `;

    const audio = new Audio(song.audio);
    let isPlaying = false;

    card.querySelector('.play-btn').addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            card.querySelector('.play-btn').innerHTML = '<i class="fa fa-play"></i>';
        } else {
            audio.play();
            card.querySelector('.play-btn').innerHTML = '<i class="fa fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });

    card.querySelector('.edit-btn').addEventListener('click', () => {
        window.location.href = `edit.html?id=${song.id}`;
    });

    card.querySelector('.remove-btn').addEventListener('click', () => {
        removeSong(index);
    });

    return card;
}

// Видалення пісні через REST API
function removeSong(index) {
    const songToDelete = songs[index];
    fetch(`http://localhost:3001/api/songs/${songToDelete.id}`, {
        method: 'DELETE',
    })
    .then(() => {
        songs.splice(index, 1);
        displaySongs(songs);
        calculateAverageListens();
    })
    .catch(error => console.error('Error deleting song:', error));
}

const addAllSongsToPage = () => {
    musicCardsContainer.innerHTML = '';
    songs.forEach((song, index) => {
        const card = createMusicCard(song, index);
        musicCardsContainer.appendChild(card);
    });
};

function displaySongs(songs) {
    musicCardsContainer.innerHTML = '';
    songs.forEach((song, index) => {
        const card = createMusicCard(song, index);
        musicCardsContainer.appendChild(card);
    });
}

const convertDurationToMinutes = (duration) => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes + (seconds / 60);
};

const sortSelect = document.getElementById('sortSelect');
const musicCardsContainer = document.getElementById('musicCardsContainer');
const searchInput = document.getElementById('searchInput');
const countBtn = document.getElementById('countBtn');
const totalDurationText = document.getElementById('totalDuration');
const clearButton = document.getElementById('clearBtn');

// Обчислення загальної тривалості пісень
const calculateTotalDuration = () => {
    const visibleCards = Array.from(musicCardsContainer.children).filter(card => card.style.display !== 'none');
    const totalDurationInMinutes = visibleCards.reduce((total, card) => {
        const durationData = card.getAttribute('data-duration');
        return total + convertDurationToMinutes(durationData);
    }, 0);

    totalDurationText.textContent = `Total duration: ${totalDurationInMinutes.toFixed(2)} min`;
};

countBtn.addEventListener('click', calculateTotalDuration);

// Обчислення середньої кількості прослуховувань
const calculateAverageListens = () => {
    const totalListens = songs.reduce((acc, song) => acc + song.listens, 0);
    const average = (totalListens / songs.length).toFixed(0);
    document.getElementById('averageListens').textContent = `Average listens: ${average}`;
};

calculateAverageListens();

const clearSorting = () => {
    musicCardsContainer.innerHTML = ''; 
    addAllSongsToPage(); 
};

// Сортування пісень через сервер
const sortCards = (sortBy) => {
    let order = 'desc'; 

    if (sortBy === 'A-Z') {
        order = 'asc'; 
    }

    fetch(`http://localhost:3001/api/songs?sortBy=${sortBy}&order=${order}`)
        .then(response => response.json())
        .then(sortedSongs => {
            console.log('Sorted songs:', sortedSongs); 
            if (Array.isArray(sortedSongs)) {
                displaySongs(sortedSongs);
            } else {
                throw new Error('Expected an array but got something else');
            }
        })
        .catch(error => console.error('Error sorting songs:', error));
};

sortSelect.addEventListener('change', (event) => {
    sortCards(event.target.value);
});

addAllSongsToPage();

// Пошук і сортування пісень через сервер
const filterAndSortSongs = (query, sortBy) => {
    let order = 'desc'; 

    if (sortBy === 'A-Z') {
        order = 'asc'; 
    }

    const url = `http://localhost:3001/api/songs?search=${query}&sortBy=${sortBy}&order=${order}`;

    fetch(url)
        .then(response => response.json())
        .then(filteredAndSortedSongs => {
            console.log('Filtered and sorted songs:', filteredAndSortedSongs);
            if (Array.isArray(filteredAndSortedSongs)) {
                displaySongs(filteredAndSortedSongs);
            } else {
                throw new Error('Expected an array but got something else');
            }
        })
        .catch(error => console.error('Error searching and sorting songs:', error));
};

// Подія на кнопку пошуку
searchButton.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase().trim();
    const sortBy = sortSelect.value;
    filterAndSortSongs(query, sortBy);
});

// Подія на зміну сортування
sortSelect.addEventListener('change', () => {
    const query = searchInput.value.toLowerCase().trim();
    const sortBy = sortSelect.value;
    filterAndSortSongs(query, sortBy);
});

// Очищення пошуку
const clearSearch = () => {
    searchInput.value = '';
    filterAndSortSongs('', sortSelect.value);
};

clearButton.addEventListener('click', clearSearch);
