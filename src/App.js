import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from "./pages/Home";
import Register from './pages/Register';

function App() {
  return (
   <div>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        {/* <Route path="/profile" element={<Profile/>}/> */}
      </Routes>
    </Router>
   </div>
  );
}

export default App;
