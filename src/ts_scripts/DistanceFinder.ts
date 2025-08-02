type Position = [number, number];
export type Direction = '↑' | '↓' | '←' | '→' | '•'; // '•' yangın söndürücüyü temsil eder

export  function computeDistances(matrix: number[][]): { distances: number[][], paths: Direction[][] } {
    if (!matrix || matrix.length === 0) {
        return { distances: [], paths: [] };
    }

    const n = matrix.length;
    const m = matrix[0].length;

    // Mesafe matrisi ve yol matrisi
    const distances: number[][] = Array.from({ length: n }, () => Array(m).fill(Infinity));
    const paths: Direction[][] = Array.from({ length: n }, () => Array(m).fill('•'));

    const queue: Position[] = [];

    // Yangın söndürücüleri işaretle
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (matrix[i][j] === 1) {
                distances[i][j] = 0;
                paths[i][j] = '•'; 
                queue.push([i, j]);
            }
        }
    }

    // Yönler ve karşılık gelen semboller
    const directions: [number, number, Direction][] = [
        [-1, 0, '↓'], //Normalde Yukarı fakat katta bulunan bir kişinin yangın söndürücüye yolu tam tersi olur
        [1, 0, '↑'],  // Aşağı
        [0, -1, '→'], // Sol
        [0, 1, '←']   // Sağ
    ];

    while (queue.length > 0) {
        const [i, j] = queue.shift()!;

        for (const [di, dj, dir] of directions) {
            const ni = i + di;
            const nj = j + dj;

            if (ni >= 0 && ni < n && nj >= 0 && nj < m) {
                if (distances[ni][nj] > distances[i][j] + 1) {
                    distances[ni][nj] = distances[i][j] + 1;
                    paths[ni][nj] = dir; // Yönü kaydet
                    queue.push([ni, nj]);
                }
            }
        }
    }

    return { distances, paths };
}

// Örnek kullanım
const matrix: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const result = computeDistances(matrix);

console.log("Mesafeler:");
console.log(result.distances.map(row => row.join(' ')).join('\n'))

console.log("\nYollar:");
console.log(result.paths.map(row => row.join(' ')).join('\n'));