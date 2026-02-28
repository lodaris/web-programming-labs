// Функції для обробки масиву книг
export const getBooksByGenre = (books, genre) => books.filter(b => b.genre === genre);
export const getAveragePages = (books) => books.reduce((sum, b) => sum + b.pages, 0) / books.length;
export const getOldestBook = (books) => books.reduce((oldest, b) => b.year < oldest.year ? b : oldest);

// Клас для роботи з колекцією книг
export default class BookCollection {
    constructor(books) {
        this.books = books;
    }

    // Повертає відсортовану копію масиву
    getSortedByYear() {
        return [...this.books].sort((a, b) => a.year - b.year);
    }

    // Додає нову книгу до колекції
    addBook(book) {
        this.books.push(book);
    }

    // Геттер для отримання поточної кількості книг
    get count() {
        return this.books.length;
    }
}