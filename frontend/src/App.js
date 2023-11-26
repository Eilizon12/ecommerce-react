// App.js

import './App.css';
import {Header} from './components/layout/Header'; // Import Header component
import {BrowserRouter as Router} from "react-router-dom"

function App() {
  return (
  <Router>
      <Header />
   </Router>
  );
}

export default App;
