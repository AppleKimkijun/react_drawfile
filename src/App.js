import React, { useRef, useEffect, useState } from "react";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const canvasRef = useRef(null);
  const [getCtx, setGetCtx] = useState(null);
  const [painting, setPainting] = useState(false);
  const [tool, setTool] = useState("pen");

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - document.querySelector(".header").offsetHeight;
    const ctx = canvas.getContext("2d");
    ctx.lineJoin = "round";
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#000000";
    setGetCtx(ctx);
  }, []);

  const clearCanvas = () => {
    getCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleMouseDown = e => {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    setPainting(true);
    draw(mouseX, mouseY);
  };

  const handleMouseUp = e => {
    setPainting(false);
    getCtx.closePath();
  };

  const handleMouseMove = e => {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    draw(mouseX, mouseY);
  };

  const handleTouchStart = e => {
    const mouseX = e.touches[0].clientX - canvasRef.current.offsetLeft;
    const mouseY = e.touches[0].clientY - canvasRef.current.offsetTop;
    setPainting(true);
    draw(mouseX, mouseY);
  };
  
  const handleTouchEnd = e => {
    setPainting(false);
    getCtx.closePath();
  };
  
  const handleTouchMove = e => {
    e.preventDefault();
    const mouseX = e.touches[0].clientX - canvasRef.current.offsetLeft;
    const mouseY = e.touches[0].clientY - canvasRef.current.offsetTop;
    draw(mouseX, mouseY);
  };

  const draw = (x, y) => {
    if (!painting) {
      getCtx.beginPath();
      getCtx.moveTo(x, y);
    } else {
      if (tool === "pen") {
        getCtx.lineTo(x, y);
        getCtx.stroke();
      } else if (tool === "eraser") {
        getCtx.globalCompositeOperation = "destination-out";
        getCtx.lineWidth = 20;
        getCtx.lineTo(x, y);
        getCtx.stroke();
        getCtx.globalCompositeOperation = "source-over";
        getCtx.lineWidth = 10;
      }
    }
  };

  const drawFn = e => {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    if (!painting) {
      getCtx.beginPath();
      getCtx.moveTo(mouseX, mouseY);
    } else {
      draw(mouseX, mouseY);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo">Create your own children's book!</div>
      </div>
  
      <div className="canvasWrap">
        <canvas
          className="canvas"
          ref={canvasRef}
          onMouseDown={() => setPainting(true)}
          onMouseUp={() => setPainting(false)}
          onMouseMove={e => drawFn(e)}
          
          onMouseLeave={() => setPainting(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
        </canvas>
      </div>
  
      <div className="buttons">
        <button className="pen" onClick={() => setTool("pen")}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button className="eraser" onClick={() => setTool("eraser")}>
          <FontAwesomeIcon icon={faEraser} />
        </button>
        <button className="clear" onClick={clearCanvas}><FontAwesomeIcon icon={faTrash} /></button>
      </div>
    </div>
  );

}
export default App
