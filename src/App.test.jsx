import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import { rotateCube, initialCubeState } from './Cube';

const getStickers = (face) =>
    document.querySelectorAll(`[data-sticker^="${face}"]`);

const stickerValues = (face) =>
    [...getStickers(face)].map((el) => el.dataset.sticker);

const clickRotate = (face, dir) =>
    fireEvent.click(screen.getByTitle(`Rotate ${face} ${dir}`));

// ── Title ────────────────────────────────────────────────────────────────────
test("renders Rubik's Cube title", () => {
    render(<App />);
    expect(screen.getByText(/Rubik's Cube/i)).toBeInTheDocument();
});

// ── Initial state ─────────────────────────────────────────────────────────────
test('initializes each face to the correct state', () => {
    render(<App />);
    ['U', 'F', 'R', 'B', 'L', 'D'].forEach((face) => {
        expect(stickerValues(face)).toEqual(
            Array.from({ length: 9 }, (_, i) => `${face}${i + 1}`)
        );
    });
});

// ── U clockwise ───────────────────────────────────────────────────────────────
test('rotates the U face clockwise', () => {
    render(<App />);
    clickRotate('U', 'clockwise');
    expect(stickerValues('U')).toEqual(['U7', 'U4', 'U1', 'U8', 'U5', 'U2', 'U9', 'U6', 'U3']);
});

// ── F counterclockwise ────────────────────────────────────────────────────────
test('rotates the F face counterclockwise', () => {
    render(<App />);
    clickRotate('F', 'counterclockwise');
    expect(stickerValues('F')).toEqual(['F3', 'F6', 'F9', 'F2', 'F5', 'F8', 'F1', 'F4', 'F7']);
});

// ── Reset ─────────────────────────────────────────────────────────────────────
test('resets the cube to initial state', () => {
    render(<App />);
    clickRotate('U', 'clockwise');
    fireEvent.click(screen.getByText(/Reset/i));
    expect(stickerValues('U')).toEqual(['U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9']);
});

test('resets the cube correctly after multiple rotations', () => {
    render(<App />);
    ['U', 'F', 'R'].forEach((f) => clickRotate(f, 'clockwise'));
    fireEvent.click(screen.getByText(/Reset/i));
    ['U', 'F'].forEach((face) => {
        expect(stickerValues(face)).toEqual(
            Array.from({ length: 9 }, (_, i) => `${face}${i + 1}`)
        );
    });
});

// ── Button count ──────────────────────────────────────────────────────────────
test('renders correct number of buttons', () => {
    render(<App />);
    // 6 faces × 2 directions + 1 reset = 13
    expect(screen.getAllByRole('button')).toHaveLength(13);
});

// ── No duplicates after rotations ─────────────────────────────────────────────
test('ensures no duplicate sticker IDs after rotations', () => {
    render(<App />);
    ['U', 'F', 'R', 'B', 'L', 'D'].forEach((f) => clickRotate(f, 'clockwise'));
    const all = [...document.querySelectorAll('[data-sticker]')].map(
        (el) => el.dataset.sticker
    );
    expect(new Set(all).size).toBe(all.length);
});

// ── Invalid face (cube logic) ─────────────────────────────────────────────────
test('throws error for invalid face in cube logic', () => {
    expect(() => rotateCube(initialCubeState, 'X', 'clockwise')).toThrow('Invalid face: X');
});

// ── All faces rotate correctly ────────────────────────────────────────────────
test('each face rotates both directions without duplicates', () => {
    ['U', 'F', 'R', 'B', 'L', 'D'].forEach((face) => {
        ['clockwise', 'counterclockwise'].forEach((dir) => {
            const result = rotateCube(initialCubeState, face, dir);
            const all = Object.values(result).flat();
            expect(new Set(all).size).toBe(54);
        });
    });
});
