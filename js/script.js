// const songs = [
//     // { title: "Ride", author: "Twenty One Pilots", listens: 650, duration: "3:45", image: "images/Ride.jpg", audio: "audio/Ride.mp3" },
//     // { title: "Runaway", author: "Onerepublic", listens: 300, duration: "2:25", image: "images/Runaway.jpg", audio: "audio/Runaway.mp3" },
//     // { title: "Paradise", author: "Coldplay", listens: 800, duration: "4:25", image: "images/Paradise.jpg", audio: "audio/cold_play_paradise.mp3" },
//     // { title: "Прогноз погоди", author: "Скрябін", listens: 600, duration: "3:17", image: "images/prognoz.jpg", audio: "audio/prognoz.mp3" },
//     // { title: "Whatever it takes", author: "Imagine Dragons", listens: 400, duration: "3:40", image: "images/Whatever.jpg", audio: "audio/whatever_it_takes.mp3" },
//     // { title: "TDME", author: "Антитіла", listens: 700, duration: "3:30", image: "images/TDME.jpg", audio: "audio/tdme.mp3" },
//     // { title: "Небо", author: "SadSvit", listens: 250, duration: "4:01", image: "images/Nebo.jpg", audio: "audio/nebo.mp3" }
// ];

let songs = JSON.parse(localStorage.getItem("songs")) || [];
        
    
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
    
    // Return the image path if it exists, otherwise return a default image
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

    // card.querySelector('.edit-btn').addEventListener('click', () => {
    //     window.location.href = `edit.html?index=${index}`;
    // });
    card.querySelector('.edit-btn').addEventListener('click', () => {
        localStorage.setItem('currentSong', JSON.stringify(songs[index]));
        window.location.href = `edit.html`;
    });
    
    // Додаємо подію для видалення
    card.querySelector('.remove-btn').addEventListener('click', () => {
        removeSong(index); // Викликати функцію видалення з індексом
    });

    return card;
}

function removeSong(index) {
    // Видаляємо пісню з масиву
    songs.splice(index, 1);

    // Оновлюємо localStorage
    localStorage.setItem('songs', JSON.stringify(songs));

    // Перевідображаємо оновлений список пісень
    displaySongs();
    calculateAverageListens();
}

// Функція для додавання всіх пісень на сторінку
const addAllSongsToPage = () => {
    musicCardsContainer.innerHTML = ''; // Очищаємо контейнер перед додаванням нових карток
    songs.forEach((song, index) => {
        const card = createMusicCard(song, index); // Передаємо індекс для кожної пісні
        musicCardsContainer.appendChild(card);
    });
};

// Функція для відображення пісень на сторінці
function displaySongs() {
    addAllSongsToPage();
}

// Завантаження пісень з localStorage при завантаженні сторінки


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


const calculateTotalDuration = () => {
    const visibleCards = Array.from(musicCardsContainer.children).filter(card => card.style.display !== 'none');
    const totalDurationInMinutes = visibleCards.reduce((total, card) => {
        const durationData = card.getAttribute('data-duration');
        return total + convertDurationToMinutes(durationData);
    }, 0);

    totalDurationText.textContent = `Total duration: ${totalDurationInMinutes.toFixed(2)} min`;
};


countBtn.addEventListener('click', calculateTotalDuration);

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

const sortCards = (sortBy) => {
    if (sortBy === 'reset') {
        clearSorting(); 
        return; 
    }

    const sortedCards = Array.from(musicCardsContainer.children).sort((a, b) => {
        if (sortBy === 'popularity') {
            return parseInt(b.dataset.popularity) - parseInt(a.dataset.popularity);
        } else if (sortBy === 'duration') {
            return convertDurationToMinutes(a.dataset.duration) - convertDurationToMinutes(b.dataset.duration);
        } else if (sortBy === 'alphabetical') {
            return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent, 'uk', { sensitivity: 'base' });
        }
        return 0;
    });

    musicCardsContainer.innerHTML = '';
    sortedCards.forEach(card => musicCardsContainer.appendChild(card));
};


sortSelect.addEventListener('change', (event) => {
    sortCards(event.target.value);
});

addAllSongsToPage();

const filterSongs = (query) => {
    const musicCards = Array.from(musicCardsContainer.children);
    musicCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase().trimStart();
        const author = card.querySelector('p strong').nextSibling.textContent.toLowerCase().trimStart();
        card.style.display = (title.includes(query) || author.includes(query)) ? '' : 'none';
    });
};


const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase().trim();
    filterSongs(query);
});

const clearSearch = () => {
    searchInput.value = '';
    filterSongs('');
};


clearButton.addEventListener('click', clearSearch);
