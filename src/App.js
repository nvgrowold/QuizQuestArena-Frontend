import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
   <div>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        {/* <Route path="/profile" element={<Profile/>}/> */}
        <Route path="/error" element={<ErrorPage />} />
        {/* Redirect all undefined routes to the ErrorPage with 404 details */}
        <Route path="*" element={<Navigate to="/error" state={{ message: 'Page not found!', status: '404' }} replace/>}/>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
