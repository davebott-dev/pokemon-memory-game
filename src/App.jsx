import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="pageCont">
      <div className="score">
        <div className="current">
          <div className="text">Current Score:</div>
          <div className="num">0</div>
          </div>
          <div className="high">
          <div className="text">High Score:</div>
          <div className="num">0</div>
          </div>
      </div>
      <div>
      <span>Do not click the same Pokemon twice!</span>

        <div className="gridCont">
          <div className="card one"></div>
          <div className="card two"></div>
          <div className="card three"></div>
          <div className="card four "></div>
          <div className="card five"></div>
          <div className="card six"></div>
          <div className="card seven"></div>
          <div className="card eight"></div>
          <div className="card nine"></div>
          <div className="card ten"></div>
          <div className="card eleven"></div>
          <div className="card twelve"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
