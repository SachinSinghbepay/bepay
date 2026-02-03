export default function GridBackground() {
    // Create a grid of divs for a more visible grid
    const gridCells = []
    const rows = 20
    const cols = 20
  
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        gridCells.push(
          <div
            key={`${i}-${j}`}
            className="border-r border-b border-gray-700"
            style={{
              gridRow: `${i + 1} / ${i + 2}`,
              gridColumn: `${j + 1} / ${j + 2}`,
            }}
          />,
        )
      }
    }
  
    return (
      <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-20">
        {gridCells}
      </div>
    )
  }
  
  