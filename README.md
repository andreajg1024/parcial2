# Parcial - ToDo API
 
Proyecto Node.js con Express y Prisma para gestionar tareas (users, tasks).

Quickstart:

1. Levantar base de datos Postgres con Docker Compose:

```powershell
docker compose up -d
```

2. Instalar dependencias e inicializar Prisma:

```powershell
npm ci
npx prisma generate
npx prisma migrate dev --name init --preview-feature
npm run dev
```

3. Tests:

```powershell
npm test
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.16. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
