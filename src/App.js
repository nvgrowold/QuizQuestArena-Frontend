import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from "./pages/Home";

function App() {
  return (
   <div>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* <Route path="/profile" element={<Profile/>}/> */}
      </Routes>
    </Router>
   </div>
  );
}

export default App;
