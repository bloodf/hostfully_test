# Heitor Hotel

A simple booking system for the company Heitor Hotel. The system is a simple booking system, that allows the user to book a room, and see the available rooms.

## Tech Stack
- React
- Vite
- TailwindCSS
- ShadCN/UI
- Iconify
- Vitest

## Folder Structure
- `src/` - The main source code of the application
- `src/components` - The components of the application
- `src/pages` - The pages of the application
- `src/hooks` - The hooks of the application
- `src/utils` - The utility functions of the application
- `src/types` - The types of the application
- `src/models` - The data models of the application
- `src/lib` - The libraries of the application
- `src/layout` - The layout of the application
- `src/state` - The global state of the application
- `tests` - The tests of the application

## Code Style
- AirBnB

## Code Structure

The code follows the principle of SOLID, with a proper separation of concerns.

Inside the `src/components` folder, you will find components that don't have any access to data structure or global state. They are just presentational components.

The `src/pages` folder contains the pages of the application. They are responsible for the data fetching and the state management.

The code saves the booked information in the local storage, so the user can refresh the page and still see the booked rooms.

All files inside the `src` have a unit test, and the tests are located in the `tests` folder.
