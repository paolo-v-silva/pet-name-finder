# Pet Name Finder

A small React application for browsing and discovering pet names with interactive filters and a detail view.

## Features

- Filter names by gender
- Filter names by starting letter
- Filter names by category using grouped checkboxes
- See the number of active category filters per group
- Browse results with pagination controls
- Select a pet name to view its details and HTML-formatted description

## Tech Stack

- React 19
- TypeScript
- Vite
- ESLint
- Prettier
- React Icons

## Project Structure

```text
src/
  assets/
  components/
    CategoryFilter/
    GenderFilter/
    LetterFilter/
    PetDetail/
    PetNameList/
  data/
  App.tsx
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local URL shown in the terminal.

## Available Scripts

- `npm run dev` — start the Vite development server
- `npm run build` — create a production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint
- `npm run format` — format the project with Prettier
- `npm run format:check` — check formatting without changing files

## Current Behavior

The app keeps all filter state in the main application and passes it down to the UI components. The pet list updates based on the selected gender, letter, and categories, while pagination resets appropriately when filters change.

## Notes

The pet and category data are currently loaded from local JSON files inside the `src/data` folder.

## Live Demo

https://pet-name-finder-yns5.vercel.app/

