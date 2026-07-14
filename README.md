# 📊 Finance Tracker

- Оригинальная идея: <https://github.com/itheinkarchitect>
- Оригинальная реализация: <https://github.com/fockusty>

Полнофункциональное приложение для учёта личных финансов (доходы и расходы) с **REST API** на **FastAPI** и клиентской частью на **Vue 3**.

---

## 🚀 Возможности

- ✅ Добавление, просмотр, редактирование и удаление транзакций (расходов)
- ✅ Добавление, просмотр, редактирование и удаление доходов
- 🔍 Фильтрация по категории (встроена в интерфейс)
- 📊 Единая тёмная тема с кастомными CSS-переменными
- 📱 Адаптивный дизайн (Tailwind CSS + кастомные стили)
- ⚡ Высокая производительность (Vite + Pinia + Vue Router)

---

## 🛠 Технологии

### Бэкенд

- Репозиторий: <https://github.com/itheinkarchitect/FinanceTracker>

### Фронтенд

- **Vue 3** (Composition API)
- **TypeScript**
- **Pinia** – управление состоянием
- **Vue Router** – маршрутизация
- **Vite** – сборка
- **Tailwind CSS** – утилитный CSS-фреймворк
- **CSS-переменные** – кастомизация темы

---

## 📁 Структура проекта

```
finance-tracker/
├── src/                        # Фронтенд (Vue)
│   ├── api/                    # Клиент для работы с API
│   │   ├── client.ts          # HTTP-клиент (fetch)
│   │   ├── transactions.ts
│   │   ├── incomes.ts
│   │   └── index.ts
│   ├── components/
│   │   └── common/
│   │       ├── EntityList.vue # Универсальный компонент списка
│   │       └── EntityForm.vue # Универсальная форма
│   ├── composables/
│   │   └── use-entity-crud.ts # Хук для CRUD-операций
│   ├── stores/
│   │   ├── transactions.ts
│   │   └── incomes.ts
│   ├── views/
│   │   ├── transactions/      # Страницы для транзакций
│   │   └── incomes/           # Страницы для доходов
│   ├── router/                # Маршрутизация
│   ├── types/                 # TypeScript-типы
│   ├── App.vue
│   ├── main.ts
│   ├── main.css              # Глобальные стили + кастомные переменные
│   └── reset.css
│
├── index.html
├── package.json
├── pnpm-lock.yaml
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🔧 Установка и запуск

### Требования

- **Node.js** 20+ или 24+ (для фронтенда)
- **pnpm** (рекомендуется) или npm

---

### 1. Клонирование репозитория

```bash
git clone https://github.com/FOCKUSTY/itheinkarchitect--finance-tracker-frontend.git
cd itheinkarchitect--finance-tracker-frontend
```

```bash
git clone https://github.com/itheinkarchitect/FinanceTracker.git
cd FinanceTracker
```

---

### 2. Запуск бэкенда

```bash
cd server

# Создаём виртуальное окружение (Windows)
python -m venv venv
venv\Scripts\activate

# Устанавливаем зависимости
pip install -r requirements.txt

# Запускаем сервер
uvicorn app.main:app --reload
```

Сервер будет доступен по адресу: **<http://127.0.0.1:8000>**  
Swagger-документация: **<http://127.0.0.1:8000/docs>**

---

### 3. Запуск фронтенда

```bash
# Возвращаемся в корень проекта
cd ..

# Устанавливаем зависимости (pnpm)
pnpm install

# Запускаем dev-сервер
pnpm dev
```

Приложение будет доступно по адресу: **<http://localhost:5173>**

> **Важно:** В режиме разработки Vite проксирует запросы `/api` на бэкенд `http://127.0.0.1:8000`, поэтому CORS не нужен.

---

## 📦 Сборка для продакшена

```bash
pnpm build
```

Готовые файлы будут в папке `dist/`.

Для просмотра продакшен-версии локально:

```bash
pnpm preview
```

---

## 🧩 API Endpoints (кратко)

| Метод  | Эндпоинт | Описание |
| ------ | -------- | -------- |
| GET    | `/transactions` | Получить все транзакции (с фильтром по категории) |
| POST   | `/transactions/` | Создать транзакцию |
| GET    | `/transactions/{id}` | Получить транзакцию по ID |
| PUT    | `/transactions/{id}` | Обновить транзакцию |
| DELETE | `/transactions/{id}` | Удалить транзакцию |
| GET    | `/incomes` | Получить все доходы (с фильтром по категории) |
| POST   | `/incomes/` | Создать доход |
| GET    | `/incomes/{id}` | Получить доход по ID |
| PUT    | `/incomes/{id}` | Обновить доход |
| DELETE | `/incomes/{id}` | Удалить доход |

Подробнее смотрите в Swagger-документации.

---

## 🎨 Стилизация и тема

В проекте используется **тёмная тема**, цвета заданы через CSS-переменные в `src/main.css`:

- `--bg-default` – основной фон
- `--fg-default` – основной цвет текста
- `--btn-primary`, `--btn-danger`, `--btn-secondary` – кнопки
- `--bg-smooth`, `--bg-smooth-ce` – фоны блоков

Вы можете легко изменить цветовую схему, подправив эти переменные.

---

## 🤝 Вклад

Если вы хотите улучшить проект, создавайте **pull request** или открывайте **issue**.

---

## 📄 Лицензия

MIT License. Подробнее в файле [LICENSE](LICENSE).
