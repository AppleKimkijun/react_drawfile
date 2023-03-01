import './App.css';
function App() {
  const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

ctx.strokeStyle = "black";
ctx.lineWidth = 7;

let painting = false;

function startPainting() {
    painting=true;
}
function stopPainting(event) {
    painting=false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}
  return (
    <div className="App">
      <canvas id="jsCanvas" className="canvas"></canvas>
    </div>
  );
}

export default App;
