import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import AdminProfile from './pages/AdminProfile';
import PasswordResetRequest from './pages/PasswordResetRequest';
import ResetPassword from './pages/ResetPassword';
import QuizScoresRanking from './pages/QuizScoresRanking';
import ViewAllQuizzes from './pages/ViewAllQuizzes';
import CreateQuiz from './pages/CreateQuiz';
import ManageQuizzes from './pages/ManageQuizzes';
import PlayQuiz from './pages/PlayQuiz';

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
        <Route path="/password-reset" element={<PasswordResetRequest />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/quizScoresRanking" element={<QuizScoresRanking />} />
        <Route path="/viewAllQuizzes" element={<ViewAllQuizzes />} />
        <Route path="/createQuiz" element={<CreateQuiz />} />
        <Route path="/manageQuizzes" element={<ManageQuizzes />} />
        <Route path="/play/:quizId" element={<PlayQuiz />} />

        <Route path="/error" element={<ErrorPage />} />
        {/* Redirect all undefined routes to the ErrorPage with 404 details */}
        <Route path="*" element={<Navigate to="/error" state={{ message: 'Page not found!', status: '404' }} replace/>}/>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
