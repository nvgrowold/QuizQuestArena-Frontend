import React, {useState} from 'react';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';
import {useLocation, Link } from 'react-router-dom';

const Navbar = () => {
    const[isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    };

    const handleMenuItemClick = () => {
      // Close the menu when a menu item is clicked
      setIsMenuOpen(false);
    };

    //don't show the menu in home page, only show logo
    const isHomePage = location.pathname === "/";

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>QUIZ.</h1>
      {/* desktop menu */}
      {!isHomePage && (
        <ul className='hidden md:flex'>
        <li className='p-4'>
            <Link to="/" >Home</Link>
          </li>
          <li className='p-4'>
            <Link to="/userProfile">Profile</Link>
          </li>
          <li className='p-4'>
            <Link to="/viewAllQuizzes">Quiz</Link>
          </li>
          <li className='p-4'>
            <Link to="/quizScoresRanking">Score</Link>
          </li>
          <li className='p-4'>
          <Link to="#contact">Contact</Link>
          </li>      
        </ul>
      )}

      {/* hamburger icon */}
      {!isHomePage && (
        <div onClick={toggleMenu} className='block md:hidden cursor-pointer' aria-expanded={isMenuOpen}>
          {/*if isMenuOpen is true then show AiOutlineClose, else show AiOutlineMenu */}
          {!isMenuOpen ? <AiOutlineMenu size={20}/> : <AiOutlineClose size={20}/>}
        </div>
      )}

      {/* mobile menu */}
      {!isHomePage && (
        <ul className={`fixed top-0 left-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] z-50 ease-in-out duration-500
                  ${isMenuOpen ? 'left-0' : 'left-[-100%]'}`} >
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>QUIZ.</h1>
        <li className="p-4 border-b border-gray-600">
            <Link to="/" onClick={handleMenuItemClick}>
              Home
            </Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link to="/userProfile" onClick={handleMenuItemClick}>
              Profile
            </Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link to="/viewAllQuizzes" onClick={handleMenuItemClick}>
              Quiz
            </Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link to="/quizScoresRanking" onClick={handleMenuItemClick}>
              Score
            </Link>
          </li>
          <li className="p-4">
            <Link to="#contact" onClick={handleMenuItemClick}>
              Contact
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar