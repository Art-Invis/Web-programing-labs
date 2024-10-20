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
        song: songUrl,
        listens: getRandomListens()
    };

    

    let songs = JSON.parse(localStorage.getItem("songs")) || [];
    const duplicateSong = songs.some(song => song.title === title && song.author === author);
    if (duplicateSong) {
        alert("Пісня з таким заголовком і автором вже існує.");
        return;
    }
    songs.push(newSong);
    localStorage.setItem("songs", JSON.stringify(songs));
    window.location.href = "./index.html";
    
    })
    
