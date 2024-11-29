import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='max-w-[1240px] mx-auto mt-72 py-16 px-4 grid lg:grid-cols-1 gap-8 text-gray-300'>
      <div className=''>
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>QUIZ.</h1>
        <p className='py-4'>Step into the ultimate challenge! At Quiz Quest Arena, every question is a step closer to glory. Compete, conquer, and claim your place among the champions. Are you ready to test your knowledge and rise to the top?</p>
        <div className='flex justify-between md:w-[50%] mx-auto my-6'>
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
            <FaGithubSquare size={30} />
            <FaDribbbleSquare size={30} />
        </div>
      </div>
    </div>
  );
};

export default Footer;