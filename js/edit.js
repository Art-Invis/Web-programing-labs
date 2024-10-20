document.addEventListener('DOMContentLoaded', () => {
    // Отримуємо дані про пісню з localStorage
    const currentSong = JSON.parse(localStorage.getItem('currentSong'));

    // Зберігаємо оригінальний title для пошуку
    const originalTitle = currentSong.title;

    // Заповнюємо форму даними про пісню
    document.getElementById('title').value = currentSong.title;
    document.getElementById('author').value = currentSong.author;
    document.getElementById('duration').value = currentSong.duration;
    document.getElementById('songUrl').value = currentSong.songUrl;

    // Обробка події відправки форми
    const editSongForm = document.getElementById('editSongForm');
    editSongForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Оновлюємо дані про пісню з форми
        currentSong.title = document.getElementById('title').value;
        currentSong.author = document.getElementById('author').value;
        currentSong.duration = document.getElementById('duration').value;

        // Отримуємо новий songUrl
        const newSongUrl = document.getElementById('songUrl').value;

        // Якщо новий URL не порожній, оновлюємо його
        if (newSongUrl.trim() !== "") {
            currentSong.songUrl = newSongUrl;
        }

        // Оновлюємо масив songs в localStorage
        let songs = JSON.parse(localStorage.getItem('songs')) || [];
        const songIndex = songs.findIndex(song => song.title === originalTitle); // Знайдемо пісню за оригінальним title

        if (songIndex !== -1) {
            songs[songIndex] = currentSong; // Оновлюємо існуючу пісню
            localStorage.setItem('songs', JSON.stringify(songs));
        }

        alert("Song updated successfully!");
        window.location.href = 'index.html'; // Повертаємося на головну сторінку
    });

    // Обробка події видалення пісні
    const deleteSongButton = document.getElementById('deleteSong');
    deleteSongButton.addEventListener('click', () => {
        if (confirm("Are you sure you want to delete this song?")) {
            let songs = JSON.parse(localStorage.getItem('songs')) || [];
            songs = songs.filter(song => song.title !== originalTitle); // Видаляємо пісню за оригінальним title

            localStorage.setItem('songs', JSON.stringify(songs));
            alert("Song deleted successfully!");
            window.location.href = 'index.html'; // Повертаємося на головну сторінку
        }
    });
});
