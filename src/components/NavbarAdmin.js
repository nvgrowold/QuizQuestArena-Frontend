import React, {useState} from 'react';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';
import {useLocation, Link,  useNavigate} from 'react-router-dom';

const NavbarAdmin = () => {
    const[isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    };

    const handleMenuItemClick = () => {
      // Close the menu when a menu item is clicked
      setIsMenuOpen(false);
    };

    const handleLogout = async () => {
      try {
        await fetch("/api/users/logout", {
          method: "POST",
          credentials: "include",
        });
        navigate("/"); // Navigate to the home page after logout
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

  // List of routes where the menu should be hidden
  const noMenuRoutes = ["/", "/login", "/register", "/password-reset", "/reset-password","/error"];

  // Check if the current path matches any of the noMenuRoutes
  const shouldHideMenu = noMenuRoutes.includes(location.pathname);

    // // List of routes where the navbar should not be displayed
    // const hiddenRoutes = ["/", "/login", "/register", "/password-reset", "/error"];

    // // Check if the current path matches any of the hidden routes
    // if (hiddenRoutes.includes(location.pathname)) {
    //   return null; // Don't render the navbar
    // }

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>QUIZ.</h1>
      {/* desktop menu */}
      {!shouldHideMenu && (
        <ul className='hidden md:flex items-center'>
        <li className='p-4 hover:text-[#00df9a] cursor-pointer'>
            <Link to="/" >Home</Link>
          </li>
          <li className="p-4 hover:text-[#00df9a] cursor-pointer">
            <Link to="/adminProfile" onClick={handleMenuItemClick}>
              Profile
            </Link>
          </li>
          <li className="p-4  hover:text-[#00df9a] cursor-pointer">
            <Link to="/createQuiz" onClick={handleMenuItemClick}>
              Create Quiz
            </Link>
          </li>
          <li className="p-4 hover:text-[#00df9a] cursor-pointer">
            <Link to="/manageQuizzes" onClick={handleMenuItemClick}>
              Manage Quizzes
            </Link>
          </li>
          <li className='p-4 hover:text-[#00df9a] cursor-pointer'>
            <Link to="/quizScoresRanking">Score</Link>
          </li>
          <li className='p-4'>
          <button onClick={handleLogout} className="text-white hover:text-[#00df9a]">
              Logout
            </button>
          </li>      
        </ul>
      )}

      {/* hamburger icon */}
      {!shouldHideMenu && (
        <div onClick={toggleMenu} className='block md:hidden cursor-pointer' aria-expanded={isMenuOpen}>
          {/*if isMenuOpen is true then show AiOutlineClose, else show AiOutlineMenu */}
          {!isMenuOpen ? <AiOutlineMenu size={20}/> : <AiOutlineClose size={20}/>}
        </div>
      )}

      {/* mobile menu */}
      {!shouldHideMenu && (
        <ul className={`fixed top-0 left-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] z-50 ease-in-out duration-500
                  ${isMenuOpen ? 'left-0' : 'left-[-100%]'}`} >
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>QUIZ.</h1>
        <li className="p-4 border-b border-gray-600  hover:text-[#00df9a] cursor-pointer">
            <Link to="/" onClick={handleMenuItemClick}>
              Home
            </Link>
          </li>
          <li className="p-4 border-b border-gray-600  hover:text-[#00df9a] cursor-pointer">
            <Link to="/adminProfile" onClick={handleMenuItemClick}>
              Profile
            </Link>
          </li>
          <li className="p-4 border-b border-gray-600  hover:text-[#00df9a] cursor-pointer">
            <Link to="/createQuiz" onClick={handleMenuItemClick}>
              Create Quiz
            </Link>
          </li>
          <li className="p-4 border-b border-gray-600  hover:text-[#00df9a] cursor-pointer">
            <Link to="/manageQuizzes" onClick={handleMenuItemClick}>
              Manage Quizzes
            </Link>
          </li>
          <li className="p-4 border-b border-gray-600  hover:text-[#00df9a] cursor-pointer">
            <Link to="/quizScoresRanking" onClick={handleMenuItemClick}>
              Score
            </Link>
          </li>
          <li className="p-4">
          <button onClick={handleLogout} className="text-white hover:text-[#00df9a] w-full text-left cursor-pointer">
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavbarAdmin;