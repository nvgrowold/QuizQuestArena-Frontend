import React from "react";
import { Link } from "react-router-dom";
import { ReactTyped as Typed } from 'react-typed'; //npm install react-typed --save

const HomePage = () => {
    return (
        <div className="text-white">
            <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
                <p className='text-[#00df9a] font-bold p-2 text-2xl'>
                    STEP INTO THE ULTIMATE QUIZ ADVENTURE!
                </p>
                <h1 className='md:text-6xl sm:text-5xl text-3xl font-bold md:py-6'>
                    Quiz Quest Arena Awaits!
                </h1>
                <div className='flex justify-center items-center'>
                    <p className='md:text-4xl sm:text-3xl text-xl font-bold py-4'>
                        Challenge Your Knowledge in
                    </p>
                    <Typed
                        className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2 text-[#00df9a]'
                        strings={['History', 'Science', 'Pop Culture', 'Sports', 'Gaming']}
                        typeSpeed={100}
                        backSpeed={120}
                        loop
                    />
                </div>
                <p className='md:text-xl text-lg font-bold text-gray-400 mt-4'>
                    Compete, Learn, and Win Big Prizes! Are you ready to prove you're the ultimate quiz master?
                </p>
                <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black hover:bg-[#00af7c] transition duration-300'>
                    <Link to="/login">Get Started</Link>
                </button>
            </div>
        </div>
    );
};

export default HomePage;
