# Pokémon CardDex

Welcome to my Pokémon CardDex! This tool allows users to search for Pokémon cards in order to build a collection. See detailed information about cards, and get statistics about your collection.

## API Reasoning

Chose the following API: https://docs.pokemontcg.io/
For the following reasons:

- Seemed to be the most extensive API available for the task.
- I appreciated the type info in the documentation, as it went over each object and their attributes.
- The query functionality seemed to be very versatile and would be useful for future improvements

Downsides:

- Noticed the server response time was very slow throughout testing. Added debounce to my search functionality to reduce the amount of requests, but it still feels sluggish in action

## Design Decisions

Design goal was to create an app with a slick and dark aesthetic. I love Pokémon cards and wanted to create something that I could potentially expand into something more useful.
I built it using React-Vite with TypeScript. I used TailwindCSS with the ShadCN Component kit in order to quickly ideate and build what I had in mind.
At first I had just created a basic tool that allowed you to search for cards and view them in more detail, but I figured I should be able to do something more useful, and took my other project ShouldIRip (https://ryanperera.github.io/shouldirip/) as inspiration. Thus, leading me to add the ability to create a collection and see statistics about it.

## Future Improvements

- Visual Improvements:

  - Utilize clip-paths to have more straight edges on shapes, for a more cohesive, sharper look
  - Use a different icon set for the "Types" (Fire, Lightning, Fighting) for better legibility. Tooltips aren't really practical on mobile, so it needs to be understood what icon represents at a glance without using tooltips.
  - Further responsiveness audits. I did some testing for responsiveness throughout development, but there is still room for improvement.
  - Use (Framer) Motion to add some cool animations

- General:
  - Utilize smaller images with webp format to optimize image loading
  - Differentiate between different card types
  - Add pagination and filtering to the search
  - Consider scraping data into my own database to reduce API response times significantly
  - Display more useful data in the statistics table. This may require surveying users/players on what information would be useful to them

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
