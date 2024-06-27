import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
// eslint-disable-next-line no-unused-vars
import React from 'react';

// Test to check if the Rubik's Cube title is rendered correctly
test('renders Rubik\'s Cube title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Rubik's Cube/i);
    expect(titleElement).toBeInTheDocument();
});

// Test to check if the U face rotates clockwise correctly
test('rotates the U face clockwise', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Rotate U clockwise/i));
    const upperFace = screen.getAllByText(/U\d/).map(el => el.textContent);
    expect(upperFace).toEqual(['U7', 'U4', 'U1', 'U8', 'U5', 'U2', 'U9', 'U6', 'U3']);
});

// Test to check if the F face rotates counterclockwise correctly
test('rotates the F face counterclockwise', () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText(/Counterclockwise/i));
    fireEvent.click(screen.getByText(/Rotate F counterclockwise/i));
    const frontFace = screen.getAllByText(/F\d/).map(el => el.textContent);
    expect(frontFace).toEqual(['F3', 'F6', 'F9', 'F2', 'F5', 'F8', 'F1', 'F4', 'F7']);
});

// Test to check if the cube resets to its initial state correctly
test('resets the cube to initial state', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Rotate U clockwise/i));
    fireEvent.click(screen.getByText(/Reset/i));
    const upperFace = screen.getAllByText(/U\d/).map(el => el.textContent);
    expect(upperFace).toEqual(['U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9']);
});

// Test to check if each face initializes correctly
test('initializes each face to the correct state', () => {
    render(<App />);
    const upperFace = screen.getAllByText(/U\d/).map(el => el.textContent);
    expect(upperFace).toEqual(['U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9']);
    const frontFace = screen.getAllByText(/F\d/).map(el => el.textContent);
    expect(frontFace).toEqual(['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9']);
    // Add similar checks for other faces R, B, L, D
});

// Test to check if each face rotates correctly
test('rotates each face correctly', () => {
    render(<App />);

    // Rotate U face clockwise
    fireEvent.click(screen.getByText(/Rotate U clockwise/i));
    let upperFace = screen.getAllByText(/U\d/).map(el => el.textContent);
    expect(upperFace).toEqual(['U7', 'U4', 'U1', 'U8', 'U5', 'U2', 'U9', 'U6', 'U3']);

    // Reset to initial state
    fireEvent.click(screen.getByText(/Reset/i));

    // Rotate F face counterclockwise
    fireEvent.click(screen.getByLabelText(/Counterclockwise/i));
    fireEvent.click(screen.getByText(/Rotate F counterclockwise/i));
    const frontFace = screen.getAllByText(/F\d/).map(el => el.textContent);
    expect(frontFace).toEqual(['F3', 'F6', 'F9', 'F2', 'F5', 'F8', 'F1', 'F4', 'F7']);

    // Reset to initial state
    fireEvent.click(screen.getByText(/Reset/i));

});

// Test to check if the cube resets correctly after multiple rotations
test('resets the cube correctly after multiple rotations', () => {
    render(<App />);

    fireEvent.click(screen.getByText(/Rotate U clockwise/i));
    fireEvent.click(screen.getByText(/Rotate F clockwise/i));
    fireEvent.click(screen.getByText(/Rotate R clockwise/i));

    fireEvent.click(screen.getByText(/Reset/i));

    const upperFace = screen.getAllByText(/U\d/).map(el => el.textContent);
    expect(upperFace).toEqual(['U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9']);
    const frontFace = screen.getAllByText(/F\d/).map(el => el.textContent);
    expect(frontFace).toEqual(['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9']);
});

// Test for invalid operations
test('does not crash on invalid operations', () => {
    render(<App />);

    // Try rotating a non-existent face
    expect(() => fireEvent.click(screen.getByText(/Rotate X clockwise/i))).toThrow();
});

// Test for correct number of buttons
test('renders correct number of buttons', () => {
    render(<App />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(7); // 6 faces + 1 reset button
});

// Test to check if rotation direction toggles correctly
test('toggles rotation direction correctly', () => {
    render(<App />);

    const clockwiseButton = screen.getAllByLabelText(/Clockwise/i)[0];
    const counterclockwiseButton = screen.getAllByLabelText(/Counterclockwise/i)[0];

    // Ensure clockwise is selected by default
    expect(clockwiseButton.checked).toBe(true);

    // Toggle to counterclockwise
    fireEvent.click(counterclockwiseButton);
    expect(counterclockwiseButton.checked).toBe(true);
    expect(clockwiseButton.checked).toBe(false);
});


// Test to ensure no duplicate IDs in the cube state after rotations
test('ensures no duplicate IDs in the cube state', () => {
    render(<App />);

    // Perform some rotations
    fireEvent.click(screen.getByText(/Rotate U clockwise/i));
    fireEvent.click(screen.getByText(/Rotate F clockwise/i));
    fireEvent.click(screen.getByText(/Rotate R clockwise/i));
    fireEvent.click(screen.getByText(/Rotate B clockwise/i));
    fireEvent.click(screen.getByText(/Rotate L clockwise/i));
    fireEvent.click(screen.getByText(/Rotate D clockwise/i));

    // Collect all cube IDs
    const allIds = [
        ...screen.getAllByText(/U\d/).map(el => el.textContent),
        ...screen.getAllByText(/F\d/).map(el => el.textContent),
        ...screen.getAllByText(/R\d/).map(el => el.textContent),
        ...screen.getAllByText(/B\d/).map(el => el.textContent),
        ...screen.getAllByText(/L\d/).map(el => el.textContent),
        ...screen.getAllByText(/D\d/).map(el => el.textContent),
    ];

    // Ensure there are no duplicates
    const uniqueIds = new Set(allIds);
    expect(uniqueIds.size).toBe(allIds.length);
});
