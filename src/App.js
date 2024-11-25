import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import AdminProfile from './pages/AdminProfile';

function App() {
  return (
   <div>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/adminProfile" element={<AdminProfile />} />
        <Route path="/error" element={<ErrorPage />} />
        {/* Redirect all undefined routes to the ErrorPage with 404 details */}
        <Route path="*" element={<Navigate to="/error" state={{ message: 'Page not found!', status: '404' }} replace/>}/>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
