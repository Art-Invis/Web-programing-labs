document.addEventListener('DOMContentLoaded', () => { 
    // Отримання ID пісні з URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentSongId = urlParams.get('id'); // Отримуємо ID пісні з URL

    if (!currentSongId) {
        alert('ID пісні не знайдено.');
        window.location.href = 'index.html';
        return;
    }

    // Отримуємо пісню за її ID через API
    fetch(`http://localhost:3001/api/songs/${currentSongId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Не вдалося отримати дані пісні.');
            }
            return response.json();
        })
        .then(currentSong => {
            // Заповнюємо форму даними пісні
            document.getElementById('title').value = currentSong.title;
            document.getElementById('author').value = currentSong.author;
            document.getElementById('duration').value = currentSong.duration;
            document.getElementById('listens').value = currentSong.listens;
            document.getElementById('songUrl').value = currentSong.songUrl;

            // Оновлення пісні
            const editSongForm = document.getElementById('editSongForm');
            editSongForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // Оновлюємо дані пісні на основі введених даних
                const updatedSong = {
                    title: document.getElementById('title').value,
                    author: document.getElementById('author').value,
                    duration: document.getElementById('duration').value,
                    listens: document.getElementById('listens').value,
                    songUrl: document.getElementById('songUrl').value
                };

                console.log('Оновлення пісні:', updatedSong);

                fetch(`http://localhost:3001/api/songs/${currentSongId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedSong)
                })
                .then(updateResponse => {
                    if (updateResponse.ok) {
                        alert("Пісню успішно оновлено!");
                        window.location.href = 'index.html'; // Перенаправляємо на головну сторінку після успішного оновлення
                    } else {
                        alert('Не вдалося оновити пісню. Спробуйте ще раз.');
                    }
                })
                .catch(error => {
                    console.error('Error updating song:', error);
                    alert('Сталася помилка при оновленні пісні.');
                });
            });

            // Видалення пісні
            const deleteSongButton = document.getElementById('deleteSong');
            deleteSongButton.addEventListener('click', () => {
                if (confirm("Ви впевнені, що хочете видалити цю пісню?")) {
                    fetch(`http://localhost:3001/api/songs/${currentSongId}`, {
                        method: 'DELETE',
                    })
                    .then(response => {
                        if (response.ok) {
                            alert("Пісню успішно видалено!");
                            window.location.href = 'index.html'; // Перенаправлення після видалення
                        } else {
                            alert('Не вдалося видалити пісню. Спробуйте ще раз.');
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting song:', error);
                        alert('Сталася помилка при видаленні пісні.');
                    });
                }
            });
        })
        .catch(error => {
            console.error('Error fetching song:', error);
            alert('Сталася помилка при отриманні даних пісні.');
        });
});
