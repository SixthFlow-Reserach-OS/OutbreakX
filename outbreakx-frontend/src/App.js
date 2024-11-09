import React from "react";
import './App.css';
import MapComponent from './Components/MapComponent'; 
import 'leaflet/dist/leaflet.css';




function App() {
  return (
    <div className="App">
      <header className="navbar">
        <div className="logo">OutbreakX</div>
        <nav>
          <ul className="nav-links">
            <li><a href="#home">Settings</a></li>
          </ul>
        </nav>
      </header>
      <section>

      <MapComponent/>








      </section>
    </div>

    
    
  );
}

export default App;
