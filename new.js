const getRandomListens = () => Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

document.getElementById("createSongForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const duration = document.getElementById('duration').value;
    const songUrl = document.getElementById('songUrl').value;
    
    if (!title || !author) {
        alert("Заголовок і автор не можуть бути порожніми.");
        return;
    }

    const durationValue = parseFloat(duration);
    if (isNaN(durationValue) || durationValue <= 0) {
        alert("Тривалість має бути додатнім числом.");
        return;
    }

    if (!songUrl) {
        console.log('Song URL is not provided, proceeding without it...');
    }

    const newSong = {
        title,
        author,
        duration,
        songUrl: songUrl,
        listens: getRandomListens()
    };

    console.log('Creating new song:', newSong);
    // Send new song to the server
    fetch('http://localhost:3001/api/songs', { // Use the correct URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Set content type
        },
        body: JSON.stringify(newSong), // Convert song object to JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText); // Throw error if response is not ok
        }
        return response.json(); // Parse response JSON
    })
    .then(data => {
        console.log('Song added successfully:', data); // Log success message
        alert("Пісню успішно додано!");
        window.location.href = "./index.html"; // Redirect to the main page
    })
    .catch(error => console.error('Error adding song:', error)); // Log error if any
});
