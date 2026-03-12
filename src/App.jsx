import { useState, useRef, useCallback } from 'react';
import { initialCubeState, rotateCube } from './Cube';
import './index.css';

const COLORS = {
    U: '#FFD500',
    F: '#009B48',
    R: '#B71234',
    B: '#0046AD',
    L: '#FF5800',
    D: '#FFFFFF',
};

const FACE_NAMES = { U: 'Up', D: 'Down', F: 'Front', B: 'Back', L: 'Left', R: 'Right' };

const getColor = (sticker) => COLORS[sticker[0]] ?? '#555';

const StickerGrid = ({ stickers }) => (
    <div className="sticker-grid">
        {stickers.map((s, i) => (
            <div key={i} className="sticker" style={{ backgroundColor: getColor(s) }} data-sticker={s} />
        ))}
    </div>
);

const App = () => {
    const [cube, setCube] = useState(() => structuredClone(initialCubeState));
    const [rotX, setRotX] = useState(-25);
    const [rotY, setRotY] = useState(35);
    const drag = useRef(null);

    const handleRotate = useCallback((face, direction) => {
        setCube((prev) => rotateCube(prev, face, direction));
    }, []);

    const onMouseDown = (e) => {
        e.preventDefault();
        drag.current = { x: e.clientX, y: e.clientY, rotX, rotY };
    };

    const onMouseMove = (e) => {
        if (!drag.current) return;
        const dx = e.clientX - drag.current.x;
        const dy = e.clientY - drag.current.y;
        setRotY(drag.current.rotY + dx * 0.4);
        setRotX(drag.current.rotX - dy * 0.4);
    };

    const onMouseUp = () => { drag.current = null; };

    const SIZE = 180;
    const HALF = SIZE / 2;

    const faceTransforms = {
        F: `translateZ(${HALF}px)`,
        B: `rotateY(180deg) translateZ(${HALF}px)`,
        R: `rotateY(90deg) translateZ(${HALF}px)`,
        L: `rotateY(-90deg) translateZ(${HALF}px)`,
        U: `rotateX(90deg) translateZ(${HALF}px)`,
        D: `rotateX(-90deg) translateZ(${HALF}px)`,
    };

    return (
        <div
            className="app-bg"
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
        >
            <h1 className="app-title">Rubik&apos;s Cube</h1>
            <p className="app-hint">Drag to rotate view</p>

            <div
                className="scene"
                onMouseDown={onMouseDown}
                style={{ cursor: drag.current ? 'grabbing' : 'grab' }}
            >
                <div
                    className="cube-3d"
                    style={{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` }}
                >
                    {Object.entries(faceTransforms).map(([face, transform]) => (
                        <div key={face} className="cube-face" style={{ transform }}>
                            <StickerGrid stickers={cube[face]} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="controls-grid">
                <div />
                <FaceControl face="U" onRotate={handleRotate} />
                <div />

                <FaceControl face="L" onRotate={handleRotate} />
                <FaceControl face="F" onRotate={handleRotate} />
                <FaceControl face="R" onRotate={handleRotate} />

                <div />
                <FaceControl face="D" onRotate={handleRotate} />
                <FaceControl face="B" onRotate={handleRotate} />
            </div>

            <button
                className="reset-btn"
                onClick={() => setCube(structuredClone(initialCubeState))}
            >
                Reset
            </button>
        </div>
    );
};

const FaceControl = ({ face, onRotate }) => (
    <div className="face-control">
        <span className="face-control-label" style={{ color: COLORS[face] }}>
            {FACE_NAMES[face]}
        </span>
        <div className="face-control-btns">
            <button
                className="rotate-btn"
                title={`Rotate ${face} clockwise`}
                onClick={() => onRotate(face, 'clockwise')}
            >
                ↻
            </button>
            <button
                className="rotate-btn"
                title={`Rotate ${face} counterclockwise`}
                onClick={() => onRotate(face, 'counterclockwise')}
            >
                ↺
            </button>
        </div>
    </div>
);

export default App;
