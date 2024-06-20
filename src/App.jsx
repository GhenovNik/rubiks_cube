import { useState } from 'react';
import { initialCubeState, rotateCube } from './Cube';
import './index.css';

/**
 * Renders the main application component.
 *
 * @return {JSX.Element} The rendered application component.
 */
const App = () => {
    const [cube, setCube] = useState(JSON.parse(JSON.stringify(initialCubeState)));
    const [rotationDirection, setRotationDirection] = useState('clockwise');

    /**
     * Rotates the cube based on the specified face.
     *
     * @param {string} face - The face to rotate the cube.
     */
    const handleRotate = (face) => {
        setCube((prevCube) => rotateCube(JSON.parse(JSON.stringify(prevCube)), face, rotationDirection));
    };

    /**
     * Resets the cube to its initial state by creating a deep copy of the initialCubeState object.
     */
    const resetCube = () => {
        setCube(JSON.parse(JSON.stringify(initialCubeState)));
    };

    /**
     * Returns the corresponding background color class based on the provided color.
     *
     * @param {string} color - The color to determine the background class for.
     * @return {string} The background color class corresponding to the input color.
     */
    const getColorClass = (color) => {
        switch (color[0]) {
            case 'U':
                return 'bg-yellow-500';
            case 'F':
                return 'bg-green-500';
            case 'R':
                return 'bg-red-500';
            case 'B':
                return 'bg-blue-500';
            case 'L':
                return 'bg-orange-500';
            case 'D':
                return 'bg-white';
            default:
                return '';
        }
    };

    return (
        <div className="app-container p-6 flex">
            <div className="controls flex flex-col space-y-2 mb-4 mr-4">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <h1 className="text-2xl mb-4">Rubik's Cube by NickG</h1>
                {['U', 'F', 'R', 'B', 'L', 'D'].map((face) => (
                    <button
                        key={face}
                        className="bg-primary text-white py-2 px-4 rounded"
                        onClick={() => handleRotate(face)}
                    >
                        Rotate {face} {rotationDirection}
                    </button>
                ))}
                <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={resetCube}>
                    Reset
                </button>
                <div className="flex space-x-4 mt-4">
                    <label>
                        <input
                            type="radio"
                            name="direction"
                            value="clockwise"
                            checked={rotationDirection === 'clockwise'}
                            onChange={() => setRotationDirection('clockwise')}
                        />
                        Clockwise
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="direction"
                            value="counterclockwise"
                            checked={rotationDirection === 'counterclockwise'}
                            onChange={() => setRotationDirection('counterclockwise')}
                        />
                        Counterclockwise
                    </label>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="grid grid-cols-3 gap-1 mb-2 -ml-28">
                    {cube.U.map((color, idx) => (
                        <div key={idx} className={`h-8 w-8 flex items-center justify-center border ${getColorClass(color)}`}>
                            <span className="text-black">{color}</span>
                        </div>
                    ))}
                </div>
                <div className="flex">
                    <div className="grid grid-cols-3 gap-1 mr-2">
                        {cube.L.map((color, idx) => (
                            <div key={idx} className={`h-8 w-8 flex items-center justify-center border ${getColorClass(color)}`}>
                                <span className="text-black">{color}</span>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-1 mr-2">
                        {cube.F.map((color, idx) => (
                            <div key={idx} className={`h-8 w-8 flex items-center justify-center border ${getColorClass(color)}`}>
                                <span className="text-black">{color}</span>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-1 mr-2">
                        {cube.R.map((color, idx) => (
                            <div key={idx} className={`h-8 w-8 flex items-center justify-center border ${getColorClass(color)}`}>
                                <span className="text-black">{color}</span>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                        {cube.B.map((color, idx) => (
                            <div key={idx} className={`h-8 w-8 flex items-center justify-center border ${getColorClass(color)}`}>
                                <span className="text-black">{color}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-1 mt-2 -ml-28">
                    {cube.D.map((color, idx) => (
                        <div key={idx} className={`h-8 w-8 flex items-center justify-center border ${getColorClass(color)}`}>
                            <span className="text-black">{color}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
