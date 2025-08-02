import React, { useState } from 'react';
import { computeDistances, } from './ts_scripts/DistanceFinder';
import type { Direction } from './ts_scripts/DistanceFinder'

type Matrix = number[][];
const MatrixGenerator: React.FC = () => {
  const [isStarted, setIsStarted] = useState(true);
  const [Paths, setPaths] = useState<Direction[][]>([])
  const [matrixSize, setMatrixSize] = useState<number>(0);
  const [matrix, setMatrix] = useState<Matrix>([]);
  const [originalMatrix, setOriginalMatrix] = useState<Matrix>([]);

  const sizes: number[] = [2, 3, 4, 5, 6, 7, 8, 9];

  const findNearestRoad = () => {
    setMatrix(computeDistances(matrix).distances);
    setPaths(computeDistances(matrix).paths);
    setIsStarted(false);
  };

  const generateMatrix = (size: number): void => {
    setMatrixSize(size);

    const newMatrix: Matrix = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => 0)
    );

    const extinguisherCount: number = Math.floor(Math.random() * 3) + 1;

    let placed = 0;
    while (placed < extinguisherCount) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      if (newMatrix[row][col] === 0) {
        newMatrix[row][col] = 1;
        placed++;
      }
    }

    setOriginalMatrix(newMatrix); // restart için orijinali sakla
    setPaths([]); //butona basıldığında yolları sıfırla
    setMatrix(newMatrix);
    setIsStarted(true) // başlangıç koşullarını ayarlar
  };

  const restartMatrix = () => {
    setMatrix(originalMatrix);
    setPaths([]);
    setIsStarted(true)
  };

  const toggleCell = (row: number, col: number) => {
    setMatrix((prev) => prev.map((r, rowIndex) => r.map((c, colIndex) => rowIndex === row && colIndex === col ? (c == 0 ? 1 : 0) : c)))


  }

  return (
    <div className="p-8 max-w-6xl mx-auto ">
      <h1 className="text-2xl font-bold mb-6 text-center">Select the Matrix Size</h1>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => generateMatrix(size)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${matrixSize === size
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
          >
            {size}x{size}
          </button>
        ))}
      </div>

      {matrixSize > 0 && (
        <div >
          <h2 className="text-xl font-semibold mb-4 text-center">
            {matrixSize}x{matrixSize} Matrix
          </h2>
          <div className="flex items-center justify-center gap-6 ">
            <div
              className="border-2 border-gray-300  grid "
              style={{
                gridTemplateColumns: `repeat(${matrixSize}, minmax(3rem, 1fr))`,
                gridTemplateRows: `repeat(${matrixSize}, minmax(3rem,auto))`,
              }}
            >
              {matrix.flatMap((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={` flex flex-col items-center justify-center border border-gray-200  ${isStarted === true && cell === 1 ? 'bg-amber-900' : ''} ${isStarted === false && cell === 0 ? 'bg-amber-900' : 'auto'} ${isStarted ? 'cursor-pointer' : 'cursor-not-allowed'} transition`}

                    onClick={() => { if (isStarted) { toggleCell(rowIndex, colIndex) } }}
                  >

                    <div className=" leading-none">{cell}</div>
                    <div className="text-2xl text-violet-700  leading-none">{Paths?.[rowIndex]?.[colIndex]}</div>

                  </div>
                ))
              )}
            </div>
            <div className='flex flex-col justify-between gap-5'>
              <div className="bg-white shadow-md rounded-2xl p-4 max-w-xs  flex flex-col gap-2 text-sm">
                <h2 className="text-lg font-bold text-gray-800"> Description</h2>

                <p className="text-gray-700"> <span className="font-medium text-red-600">Red</span> buttons represent fire extinguisher locations.</p>

                <p className="text-gray-700"> <span className="font-medium text-blue-600">Start</span> button calculates the shortest path and its length.</p>

                <p className="text-gray-700"> <span className="font-medium text-blue-600">Restart</span> resets the matrix to its initial state.</p>

                <div className="mt-2">
                  <p className="font-semibold text-gray-800 mb-1">Directions:</p>
                  <div className="grid grid-cols-2 gap-1 text-violet-700">
                    <span>↑ Up</span>
                    <span>↓ Down</span>
                    <span>← Left</span>
                    <span>→ Right</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button

                  onClick={() => { if (isStarted) { findNearestRoad() } }}
                  className="px-6 py-2 bg-blue-300 text-white rounded-md shadow hover:bg-blue-800 transition"
                >
                  Start
                </button>
                <button
                  onClick={restartMatrix}
                  className="px-6 py-2 bg-blue-300 text-white rounded-md shadow hover:bg-blue-800 transition"
                >
                  Restart
                </button>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default MatrixGenerator;
