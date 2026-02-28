// 4.1: Створюємо проміс, який просто чекає вказаний час через setTimeout
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 4.2: Симуляція запиту на сервер з рандомною затримкою та ймовірністю помилки
const simulateFetch = (url) => {
    return new Promise((resolve, reject) => {
        const delayTime = Math.floor(Math.random() * 300) + 200; 
        setTimeout(() => {
            if (!url.startsWith("https")) return reject(new Error(`Invalid URL: ${url}`));
            
            if (Math.random() < 0.7) {
                resolve({ url, status: 200, data: "OK" });
            } else {
                reject(new Error("Server error: 500"));
            }
        }, delayTime);
    });
};

// 4.3: Робимо запит. Якщо помилка то чекаємо 500мс і пробуємо знову, поки не закінчаться спроби
const fetchWithRetry = async (url, attempts) => {
    for (let i = 1; i <= attempts; i++) {
        try {
            console.log(`Спроба ${i}...`);
            return await simulateFetch(url);
        } catch (error) {
            if (i === attempts) throw error;
            await delay(500);
        }
    }
};

// 4.4: Запускаємо всі запити паралельно через allSettled і сортуємо результати на успішні та помилки
const fetchMultiple = async (urls) => {
    const results = await Promise.allSettled(urls.map(url => simulateFetch(url)));
    return {
        successful: results.filter(r => r.status === 'fulfilled').map(r => r.value),
        failed: results.filter(r => r.status === 'rejected').map(r => r.reason.message)
    };
};

async function main() {
    console.log("=== Завдання 4: async/await ===");
    console.time("delay");
    await delay(1000);
    console.timeEnd("delay"); 

    try {
        const result = await simulateFetch("https://jsonplaceholder.typicode.com/posts");
        console.log("Успіх 4.2:", result);
    } catch (error) {
        console.error("Помилка 4.2:", error.message);
    }

    try {
        const result = await fetchWithRetry("https://jsonplaceholder.typicode.com/posts", 5);
        console.log("fetchWithRetry результат:", result);
    } catch (error) {
        console.error("Всі спроби невдалі:", error.message);
    }

    const results = await fetchMultiple([
        "https://jsonplaceholder.typicode.com/posts",
        "http://invalid-url",
        "https://jsonplaceholder.typicode.com/users"
    ]);
    console.log("Результати 4.4:", results);
}
main();