Matrix-Based Fire Extinguisher Locator System
An interactive React + TypeScript application that visualizes fire extinguisher placements on a dynamic grid matrix. It calculates Manhattan distances from each cell to the nearest extinguisher using the Breadth-First Search (BFS) algorithm and displays direction vectors and optimal paths for emergency planning or simulation purposes.

🎯 Features

    🧩 Dynamic Grid Generation – Selectable matrix sizes (2x2 to 9x9).

    🧯 Manual or Random Fire Extinguisher Placement – Click cells to toggle extinguisher locations.

    🧭 Manhattan Distance Calculation – Visualizes distance from each cell to the nearest extinguisher.

    🔄 Direction Vector Indicators – Displays arrows showing the shortest path direction.

    📊 Real-Time Updates – Instant recalculations when the matrix or extinguisher layout changes.

    🔁 Restart Feature – Reset matrix to original state with one click.
    

💻 Tech Stack
   • React.js – UI rendering

   • TypeScript – Type-safe logic

   • Tailwind CSS – Responsive styling

   • BFS Algorithm – For pathfinding and distance calculations

Algorithms Used
    Breadth-First Search (BFS) is used to efficiently compute the minimum number of steps from each cell to the nearest fire extinguisher (red cells in the matrix).

    Each cell receives:
        Its minimum Manhattan distance
        A direction pointing to the extinguisher (↑, ↓, ←, →)

🚀 Potential Use Cases
    🔥 Fire safety planning in buildings

    🏫 Emergency evacuation route simulation

    🧪 Educational visualizations of pathfinding algorithms

    🧯 Training tools for disaster preparedness    

How to Run
    1. Clone the repo
        git clone https://github.com/Metehan-helvaci/nearest-fire-extinguisher.git

    2. Go to the project folder    
        cd nearest-fire-extinguisher

    3. Install dependencies
        npm install

    4. Start the development server
        npm run dev    

