# React + TypeScript + Vite + Cloudflare Workers + Better Auth

This template provides a minimal setup to get React working in Vite with HMR, Cloudflare Workers, and Better Auth with D1 database.

## Features

- ⚡️ Vite for fast development
- ⚛️ React 19 with TypeScript
- ☁️ Cloudflare Workers for serverless deployment
- 🔐 Better Auth for authentication
- 💾 Cloudflare D1 for database
- 🎨 Tailwind CSS + shadcn/ui components
- 📱 PWA support

## Better Auth Setup

This project includes Better Auth configured to work with Cloudflare D1.

### 1. Create a D1 Database

```bash
# Create a local D1 database for development
npx wrangler d1 create better-auth-db

# This will output a database_id. Update wrangler.jsonc with this ID.
```

### 2. Update wrangler.jsonc

Update the `database_id` in `wrangler.jsonc` with the ID from step 1:

```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "better-auth-db",
    "database_id": "your-database-id-here" // Replace with your actual ID
  }
]
```

### 3. Set Environment Variables

For local development, create a `.env` file (or use wrangler secrets for production):

```bash
# .env
BETTER_AUTH_SECRET=your-secret-key-here-change-in-production
BETTER_AUTH_URL=http://localhost:8787
```

For production, set secrets using Wrangler:

```bash
wrangler secret put BETTER_AUTH_SECRET
wrangler secret put BETTER_AUTH_URL
```

### 4. Run Database Migrations

Better Auth will automatically create the necessary tables on first run, or you can use the Better Auth CLI:

```bash
npx better-auth generate
npx better-auth migrate
```

### 5. Development

```bash
npm run dev
```

The app will be available at `http://localhost:8787` with Better Auth endpoints at `/api/auth/*`.

### 6. Using Auth in Your Components

```tsx
import { useSession, signIn, signUp, signOut } from "@/lib/auth-client";

function MyComponent() {
  const { data: session, isPending } = useSession();

  if (isPending) return <div>Loading...</div>;
  
  if (!session) {
    return (
      <div>
        <button onClick={() => signIn.email({ email: "...", password: "..." })}>
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div>
      <p>Welcome, {session.user.email}!</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
```

## Deployment

```bash
npm run build
npm run deploy
```

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
