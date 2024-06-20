/**
 * Initial state of the Rubik's cube
 */
export const initialCubeState = {
    U: ['U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9'],
    F: ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9'],
    R: ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9'],
    B: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
    L: ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'],
    D: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9'],
};

/**
 * Rotate the face clockwise.
 *
 * @param {array} face - The current state of the face to be rotated.
 * @return {array} The new state of the face after rotation.
 */
const rotateFaceClockwise = (face) => [
    face[6], face[3], face[0],
    face[7], face[4], face[1],
    face[8], face[5], face[2],
];

/**
 * Rotate the face counterclockwise.
 *
 * @param {array} face - The current state of the face to be rotated.
 * @return {array} The new state of the face after counterclockwise rotation.
 */
const rotateFaceCounterClockwise = (face) => [
    face[2], face[5], face[8],
    face[1], face[4], face[7],
    face[0], face[3], face[6],
];

/**
 * Returns the edges of the specified face of the cube.
 *
 * @param {object} cube - The cube object containing the face colors.
 * @param {string} face - The face of the cube from which to retrieve the edges.
 * @return {array} The edges of the specified face as an array.
 */
const getEdges = (cube, face) => {
    switch (face) {
        case 'U':
            return [cube.F.slice(0, 3), cube.R.slice(0, 3), cube.B.slice(0, 3).reverse(), cube.L.slice(0, 3)];
        case 'D':
            return [cube.F.slice(6, 9), cube.L.slice(6, 9), cube.B.slice(6, 9).reverse(), cube.R.slice(6, 9)];
        case 'F':
            return [cube.U.slice(6, 9), [cube.R[0], cube.R[3], cube.R[6]], cube.D.slice(0, 3).reverse(), [cube.L[8], cube.L[5], cube.L[2]]];
        case 'B':
            return [cube.U.slice(0, 3).reverse(), [cube.L[6], cube.L[3], cube.L[0]], cube.D.slice(6, 9), [cube.R[8], cube.R[5], cube.R[2]].reverse()];
        case 'L':
            return [[cube.U[0], cube.U[3], cube.U[6]], [cube.F[0], cube.F[3], cube.F[6]], [cube.D[0], cube.D[3], cube.D[6]], [cube.B[2], cube.B[5], cube.B[8]].reverse()];
        case 'R':
            return [[cube.U[2], cube.U[5], cube.U[8]], [cube.B[6], cube.B[3], cube.B[0]].reverse(), [cube.D[2], cube.D[5], cube.D[8]], [cube.F[2], cube.F[5], cube.F[8]]];
        default:
            throw new Error(`Invalid face: ${face}`);
    }
};

/**
 * Reverses the given array if either the reverseClockwise or reverseCounterClockwise flag is true.
 *
 * @param {Array} arr - The array to be reversed.
 * @param {boolean} reverseClockwise - Flag indicating whether to reverse the array in clockwise order.
 * @param {boolean} reverseCounterClockwise - Flag indicating whether to reverse the array in counter-clockwise order.
 * @return {Array} The reversed array if either reverseClockwise or reverseCounterClockwise is true, otherwise the original array.
 */
const applyReverse = (arr, reverseClockwise, reverseCounterClockwise) => {
    if (reverseClockwise || reverseCounterClockwise) {
        return arr.reverse();
    }
    return arr;
};
/**
 * Sets the edges of a cube based on the given face, edges, and clockwise flag.
 *
 * @param {Object} cube - The cube object.
 * @param {string} face - The face of the cube to set the edges for.
 * @param {Array} edges - The edges to set.
 * @param {boolean} clockwise - Flag indicating whether the edges should be set in clockwise order.
 * @return {void}
 */
const setEdges = (cube, face, edges, clockwise) => {
    switch (face) {
        case 'U':
            [cube.F[0], cube.F[1], cube.F[2]] = edges[0];
            [cube.R[0], cube.R[1], cube.R[2]] = applyReverse(edges[1], clockwise);
            [cube.B[2], cube.B[1], cube.B[0]] = applyReverse(edges[2], !clockwise, clockwise);
            [cube.L[0], cube.L[1], cube.L[2]] = applyReverse(edges[3], !clockwise);
            break;
        case 'D':
            [cube.F[6], cube.F[7], cube.F[8]] = edges[0];
            [cube.L[6], cube.L[7], cube.L[8]] = applyReverse(edges[1], clockwise);
            [cube.B[6], cube.B[7], cube.B[8]] = edges[2];
            [cube.R[6], cube.R[7], cube.R[8]] = applyReverse(edges[3], !clockwise);
            break;
        case 'F':
            [cube.U[6], cube.U[7], cube.U[8]] = edges[0];
            [cube.R[0], cube.R[3], cube.R[6]] = edges[1];
            [cube.D[2], cube.D[1], cube.D[0]] = edges[2];
            [cube.L[2], cube.L[5], cube.L[8]] = applyReverse(edges[3], !clockwise, clockwise);
            break;
        case 'B':
            [cube.U[2], cube.U[1], cube.U[0]] = applyReverse(edges[0], !clockwise,clockwise);
            [cube.L[6], cube.L[3], cube.L[0]] = applyReverse(edges[1], !clockwise,clockwise);
            [cube.D[6], cube.D[7], cube.D[8]] = applyReverse(edges[2], !clockwise,clockwise);
            [cube.R[8], cube.R[5], cube.R[2]] = edges[3];
            break;
        case 'L':
            [cube.U[0], cube.U[3], cube.U[6]] = edges[0];
            [cube.F[0], cube.F[3], cube.F[6]] = edges[1];
            [cube.D[0], cube.D[3], cube.D[6]] = edges[2];
            [cube.B[2], cube.B[5], cube.B[8]] = applyReverse(edges[3], !clockwise);
            break;
        case 'R':
            [cube.U[2], cube.U[5], cube.U[8]] = applyReverse(edges[0], !clockwise);
            [cube.B[6], cube.B[3], cube.B[0]] = edges[1];
            [cube.D[2], cube.D[5], cube.D[8]] = applyReverse(edges[2], clockwise);
            [cube.F[2], cube.F[5], cube.F[8]] = edges[3];
            break;
        default:
            throw new Error(`Invalid face: ${face}`);
    }
};

/**
 * Rotates the given edges clockwise.
 *
 * @param {Array} edges - The array of edges to be rotated.
 * @return {Array} The rotated array of edges.
 */
const rotateEdgesClockwise = (edges) => {
    return [edges[3], edges[0], edges[1], edges[2]];
};

/**
 * Rotates the given edges counter-clockwise.
 *
 * @param {Array} edges - The array of edges to be rotated.
 * @return {Array} The rotated array of edges.
 */
const rotateEdgesCounterClockwise = (edges) => {
    return [edges[1], edges[2], edges[3], edges[0]];
};

/**
 * Rotates the cube by a specified face and direction.
 *
 * @param {Object} cube - The cube object to be rotated.
 * @param {string} face - The face of the cube to rotate.
 * @param {string} direction - The direction of rotation ('clockwise' or 'counter-clockwise').
 * @return {Object} The rotated cube object.
 */
export const rotateCube = (cube, face, direction) => {
    const newCube = JSON.parse(JSON.stringify(cube)); // Deep copy of cube

    const clockwise = direction === 'clockwise';
    const faceRotation = clockwise ? rotateFaceClockwise : rotateFaceCounterClockwise;
    newCube[face] = faceRotation(cube[face]);

    let edges = getEdges(newCube, face);
    if (face === 'U' || face === 'D') {
        edges = clockwise ? rotateEdgesCounterClockwise(edges) : rotateEdgesClockwise(edges);
    } else {
        edges = clockwise ? rotateEdgesClockwise(edges) : rotateEdgesCounterClockwise(edges);
    }

    setEdges(newCube, face, edges, clockwise);

    return newCube;
};
