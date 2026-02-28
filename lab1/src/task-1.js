// 1.1. getFullName: Використовуємо деструктуризацію, щоб витягнути потрібні поля
// Якщо middleName є, додаємо першу літеру, якщо немає то виводимо без нього
const getFullName = ({ firstName, lastName, middleName }) => {
    return middleName 
        ? `${lastName} ${firstName[0]}. ${middleName[0]}.` 
        : `${lastName} ${firstName[0]}.`;
};

// 1.2. mergeObjects: rest-оператор (...objects) збирає всі передані об'єкти в масив, а Object.assign зливає їх в один новий об'єкт (останні перезаписують перших).
const mergeObjects = (...objects) => {
    return Object.assign({}, ...objects);
};

// 1.3. removeDuplicates: rest-оператор збирає масиви. Ми їх об'єднуємо (concat) і передаємо в Set, який автоматично видаляє всі дублікати, після чого spread-оператором (...) повертаємо в масив.
const removeDuplicates = (...arrays) => {
    return [...new Set([].concat(...arrays))];
};

// 1.4. createUpdatedUser: Створюємо копію користувача через spread. Щоб не затерти вкладений об'єкт address, ми його теж розгортаємо і зливаємо окремо.
const createUpdatedUser = (user, updates) => {
    const newUser = { ...user, ...updates };
    if (user.address && updates.address) {
        newUser.address = { ...user.address, ...updates.address };
    }
    return newUser;
};

// Виведення результатів
console.log("1.1:", getFullName({ firstName: "Петро", lastName: "Іванов", middleName: "Сергійович" }));
console.log("1.2:", mergeObjects({ a: 1 }, { b: 2 }, { a: 3, c: 4 }));
console.log("1.3:", removeDuplicates([1, 2, 3], [2, 3, 4], [4, 5]));
const user = { name: "John", age: 25, address: { city: "Kyiv", zip: "01001" } };
console.log("1.4:", createUpdatedUser(user, { age: 26, address: { zip: "02002" } }));