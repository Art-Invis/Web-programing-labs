const myPromise = new Promise((resolve, reject) => {
    const success = true;

    if (success) {
        resolve("Операція успішна!");  
    } else {
        reject("Сталася помилка.");  
    }
});

async function handlePromise() {
    try {
        const result = await myPromise;  
        console.log(result); 
    } catch (error) {
        console.error(error); 
    }
}

handlePromise();
