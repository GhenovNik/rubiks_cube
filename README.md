
# Rubik's Cube Web App

This is a simple web application that visually represents a Rubik's Cube and allows users to perform rotations on any face of the cube. The app features a simple interface with buttons to select and rotate faces, displaying the current state of the cube after each move.

## Features

- Display a visual representation of a Rubik's Cube.
- Allow rotation of any face of the cube clockwise or counterclockwise.
- Update the display to reflect the current state of the cube after each rotation.
- Reset the cube to its initial state.

## Technologies Used

- **React**: for building the user interface.
- **JavaScript/ES6** for the logic and functionality.
- **Tailwind CSS**: for styling.
- **Vite**: for the build tool and development server.
- **ESLint**: for identifying and fixing linting problems in JavaScript code.

## Project Structure

rubiks_cube/
│
├── src/ # Source code
│ ├── App.js # Main React component
│ ├── Cube.js # Logic for rotating the cube
│ ├── index.css # Styles
│ └── index.js # Entry point for React
│
├── index.html # Main HTML file
├── vite.config.js # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
├── postcss.config.js # PostCSS configuration
├── .eslintrc.cjs # ESLint configuration
├── .gitignore # Files and directories to ignore in Git
├── package.json # Project dependencies and scripts
├── package-lock.json # Exact versions of project dependencies
└── README.md # Project documentation


## Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/rubiks_cube.git
   cd rubiks_cube
   
2. Install the dependencies:
   ```bash 
   npm install
   
3. Running the Application
   To start the app, run:
   ```bash
   npm run dev
   
4. Open your browser and navigate to http://localhost:5173 to see the application in action.

## Usage
* Use the buttons labeled `Rotate U`, `Rotate F`, `Rotate R`, `Rotate B`, `Rotate L`, and `Rotate D` to rotate the corresponding faces of the cube.
* Select the rotation direction (Clockwise or Counterclockwise) using the radio buttons.
* Click the `Reset` button to reset the cube to its initial state.

## Contact
* Author: Nicolai Ghenov
* Email: nick.rundev@gmail.com
* GitHub: GhenovNik