# Task

Build a simple dashboard that fetches and displays data from any public API. The API can be anything that interests you. How you design and present the data is up to you - we want to see your best judgement in creating a clear and useful UI.

Some examples could be a Pokémon explorer dashboard, where you can search and display all types of information about a specific Pokémon. Or even an NBA stats dashboard where you can look up a player or team and visualize their career stats.

Notes

    We primarily use React/Typescript, but you are welcomed to use another stack if you prefer
    No authentication is needed
    Please keep a clear git commit history, to show us your development process
    Please deploy this to any public URL (e.g. vercel, netlify, github pages, etc)
    Please also include a short README explaining:
        what API you chose and why
        any design decisions
        any ideas for future improvements
    We are not expecting a huge project, try to aim for something that can be built in ~6-8 hours of work.

# what API you chose and why

Trying: https://docs.pokemontcg.io/

# any ideas for future improvements

- Visual Improvements:

  - utilize clip-paths to have more straight edges on shapes, for a more cohesive, sharper look
  - use a different icon set for the "Types" (Fire, Lightning, Fighting) for better legibility. Tooltips aren't really practical on mobile, so it needs to be understood what icon represents at a glance without using tooltips.

- General:
  - Utilize smaller images with webp format to optimize image loading
  - Differentiate between different card types
  - Add pagination and filtering to the search

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
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
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
