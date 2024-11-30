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
    <div className='max-w-[1240px] mx-auto  h-38  px-4 grid lg:grid-cols-1 gap-8 text-gray-300'>
      <div className=''>
        <h1 className='w-full text-xl font-bold text-[#00df9a]'>QUIZ.</h1>
        <p className='py-4 text-sm'>Step into the ultimate challenge! At Quiz Quest Arena, every question is a step closer to glory. Compete, conquer, and claim your place among the champions. Are you ready to test your knowledge and rise to the top?</p>
        <div className='flex justify-between md:w-[50%] mx-auto'>
            <FaFacebookSquare size={20} />
            <FaInstagram size={20} />
            <FaTwitterSquare size={20} />
            <FaGithubSquare size={20} />
            <FaDribbbleSquare size={20} />
        </div>
      </div>
    </div>
  );
};

export default Footer;