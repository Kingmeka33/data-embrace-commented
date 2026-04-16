# Product Inventory Manager

A React + Vite frontend with a NestJS + Prisma + MySQL backend.

## Frontend

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:8080`.

Create a root `.env` file with:

```env
VITE_API_URL=http://localhost:3000
```

## Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

Create `backend/.env` with:

```env
DATABASE_URL=mysql://root:YOUR_PASSWORD@localhost:3306/data_embrace_db
PORT=3000
FRONTEND_URL=http://localhost:8080
```

## Sample products

The backend auto-seeds 5 sample products the first time `/products` is requested and the database is empty.

You can also seed manually with:

```bash
cd backend
npm run seed
```
