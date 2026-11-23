# SmartLab Monitor – React + Tailwind

Proyecto en React (Vite) con un componente `Home` hecho con Tailwind CSS y adaptado a móvil, tablet y escritorio (RWD).

## Arrancar en local

```bash
npm install
npm run dev
```

## RWD

- **Móvil** (< 768px): menú hamburguesa, KPIs en 2 columnas, tarjetas en 1 columna.
- **Tablet** (`md`, 768px): menú visible, KPIs en 4 columnas, tarjetas en 2 columnas.
- **Escritorio** (`lg`, 1024px): tarjetas en 3 columnas.

En el pie de página se indica la vista actual (Móvil / Tablet / Escritorio).

## Deploy en Vercel

1. Sube el proyecto a un repositorio de GitHub.
2. Entra en https://vercel.com, pulsa **Add New → Project** e importa el repositorio.
3. Vercel detecta Vite solo (Build: `npm run build`, Output: `dist`). Pulsa **Deploy**.
