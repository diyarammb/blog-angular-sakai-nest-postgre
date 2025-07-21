
---

## 🖥️ Frontend Tech Stack

- Angular 17 + TypeScript
- [Sakai-NG](https://github.com/primefaces/sakai-ng)
- PrimeNG (UI components)
- AG Grid (tabular pagination)
- JWT authentication
- Angular Reactive Forms

---

## 🛠️ Backend Tech Stack

- NestJS
- PostgreSQL
- TypeORM
- Passport.js with JWT strategy

---

## ⚙️ Setup Instructions

### ✅ Frontend Setup

```bash
cd frontend
npm install
ng serve
```

### ✅ Backend Setup
```bash

cd backend
pnpm install
pnpm start:dev
```


## ✅ Backend Setup  Create a .env file in backend/:

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=
DATABASE_NAME=

JWT_SECRET=ytoke
JWT_EXPIRES_IN=1d