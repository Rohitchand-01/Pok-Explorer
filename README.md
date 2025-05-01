# Pokémon App

This app is designed to provide an interactive Pokémon experience, allowing users to search, filter, view details, compare Pokémon, and manage a favorites list. The app fetches data from the PokeAPI and utilizes React for the user interface and Tailwind CSS for styling, with a focus on responsiveness and ease of use on mobile devices.

## Features

- **Search & Filter**: Filter Pokémon by type and search by name.
- **Sorting**: Sort Pokémon by ID or name (ascending or descending).
- **Random Pokémon**: Click the button to view a random Pokémon's details.
- **Favorites**: Add/remove Pokémon to/from your favorites list, stored in `localStorage` for persistence.
- **Compare**: Compare Pokémon side by side.

## Approach

- Built with React for dynamic state management and routing.
- Styled using Tailwind CSS with a mobile-first approach to ensure responsiveness.
- Data is fetched asynchronously from the PokeAPI, with proper loading states and error handling.
- LocalStorage is used to persist favorites across sessions.
- React Router is used to handle page navigation, such as viewing Pokémon details and comparing Pokémon.

## Challenges Faced

- Ensuring mobile responsiveness, particularly with dropdowns and filtering options, was a key challenge.
- Handling dynamic data and ensuring smooth sorting and filtering without compromising performance.
- Managing multiple states (search, filter, favorites, etc.) and maintaining synchronization across components.
- Optimizing performance for a large number of Pokémon, especially when loading more items or applying multiple filters.
- Designing intuitive UI components and ensuring accessibility for a seamless user experience.

## Installation

1. Clone this repository to your local machine.
2. Run `npm install` to install all dependencies.
3. Use `npm start` to run the app locally.

## Technologies Used

- **React**: For building the user interface and managing state.
- **React Router**: For navigation between pages.
- **Tailwind CSS**: For styling the components with a mobile-first approach.
- **PokeAPI**: For fetching Pokémon data.
- **localStorage**: To persist favorite Pokémon across sessions.