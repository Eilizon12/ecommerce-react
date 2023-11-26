import './App.css';
import Headers from "./component/layout/Header.js";
import {BrowserRouter as Router} from "react-router-dom"


function App() {
  return (
  <Router>
    <Headers />
  </Router>
  );
  
}

export default App;