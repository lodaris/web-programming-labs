# Лабораторна робота №8 — Інтеграція бази даних у Nest.js застосунок

Task Manager API з PostgreSQL та TypeORM. CRUD для задач і тегів, зв'язок ManyToMany.

## Технології

- Nest.js + TypeScript
- TypeORM + PostgreSQL
- class-validator + class-transformer
- @nestjs/config

## Запуск

### 1. Створити базу даних

```sql
CREATE DATABASE task_manager_lab8;
```

### 2. Налаштувати змінні середовища

```bash
cp .env.example .env
```

### 3. Встановити залежності та виконати міграції

```bash
npm install
npm run migration:run
```

### 4. Запустити сервер

```bash
npm run start:dev
```

## Змінні середовища

| Змінна | Опис | За замовчуванням |
|--------|------|------------------|
| DB_HOST | Хост PostgreSQL | localhost |
| DB_PORT | Порт PostgreSQL | 5432 |
| DB_USERNAME | Користувач БД | postgres |
| DB_PASSWORD | Пароль БД | postgres |
| DB_NAME | Назва бази даних | task_manager_lab8 |
| PORT | Порт сервера | 3000 |

## Ендпоінти

### Задачі

| Метод | URL | Статус | Опис |
|-------|-----|--------|------|
| GET | /tasks | 200 | Список усіх задач з тегами |
| GET | /tasks/search?status=... | 200 | Фільтрація за статусом |
| GET | /tasks/:id | 200 / 404 | Задача за id з тегами |
| POST | /tasks | 201 / 400 | Створити задачу (з опціональними tagIds) |
| PATCH | /tasks/:id | 200 / 400 / 404 | Оновити задачу |
| DELETE | /tasks/:id | 204 / 404 | Видалити задачу |

### Теги

| Метод | URL | Статус | Опис |
|-------|-----|--------|------|
| POST | /tags | 201 / 400 | Створити тег |
| GET | /tags | 200 | Список усіх тегів |
| PATCH | /tags/:id | 200 / 400 / 404 | Оновити тег |
| DELETE | /tags/:id | 204 / 404 | Видалити тег |

## Скрипти міграцій

```bash
npm run migration:generate -- src/migrations/MigrationName
npm run migration:run
npm run migration:revert
```
