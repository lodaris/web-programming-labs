import { LIBRARY_NAME, books } from "./data.js";
// Імпортуємо клас за замовчуванням та функції з перейменуванням
import BookCollection, { getBooksByGenre as getGenre, getAveragePages, getOldestBook } from "./utils.js";

console.log("=== Завдання 5: Модулі ===");
console.log("Бібліотека:", LIBRARY_NAME);
console.log("Початкова кількість книг:", books.length);

// 1. Демонстрація функцій
const sfBooks = getGenre(books, "Наукова фантастика");
console.log("Наукова фантастика:", sfBooks); 

const avgPages = getAveragePages(books);
console.log("Середня кількість сторінок:", avgPages.toFixed(1)); 

const oldest = getOldestBook(books);
console.log("Найстаріша книга:", oldest.title, `(${oldest.year})`);

// 2. Демонстрація роботи з класом
const myLibrary = new BookCollection(books);

// Додаємо нову книгу через метод класу
myLibrary.addBook({ 
    title: "Відьмак", 
    author: "Анджей Сапковський", 
    year: 1986, 
    pages: 320, 
    genre: "Фентезі" 
});

console.log("Кількість книг після додавання:", myLibrary.count);
console.log("Відсортовано за роком видання:", myLibrary.getSortedByYear());