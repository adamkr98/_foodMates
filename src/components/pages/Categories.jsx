import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from './../Navbar';
import Footer from '../Footer';
import Vegetables from './Vegetables';
import Fruits from './Fruits';
import Meat from './Meat';
import Fish from './Fish';

const Categories = () => {
    return (
        <>
            <div className="h-[80vh] flex flex-wrap justify-around">
                <div className="w-[20rem] ml-4 mb-4 flex flex-col items-center justify-center">
                    <Link to="/vegetables">
                        <img
                        src="https://source.unsplash.com/TmjyLCUpcDY"
                        alt=""
                        className='rounded-md hover:scale-105 cursor-pointer shadow-xl'
                        />
                    </Link>
                    <p className='mt-8 text-2xl'>
                        Vegetables
                    </p>
                </div>
                <div className="w-[20rem] ml-4 mb-4 flex flex-col items-center justify-center">
                    <Link to="/fruits">
                        <img
                        src="https://source.unsplash.com/90Ro3YkIuec"
                        alt=""
                        className='rounded-md hover:scale-105 cursor-pointer shadow-xl'
                        />
                    </Link>
                    <p className='mt-8 text-2xl'>
                        Fruits
                    </p>
                </div>
                <div className="w-[20rem] ml-4 mb-4 flex flex-col items-center justify-center">
                    <Link to="/meat">
                        <img
                        src="https://source.unsplash.com/AQ_BdsvLgqA"
                        alt=""
                        className='rounded-md hover:scale-105 cursor-pointer shadow-xl'
                        />
                    </Link>
                    <p className='mt-8 text-2xl'>
                        Meat
                    </p>
                </div>
                <div className="w-[20rem] ml-4 mb-4 flex flex-col items-center justify-center">
                    <Link to="/fish">
                        <img
                        src="https://source.unsplash.com/jsb6zQNhOgo"
                        alt=""
                        className='rounded-md hover:scale-105 cursor-pointer shadow-xl'
                        />
                    </Link>
                    <p className='mt-8 text-2xl'>
                        Fish
                    </p>
                </div>
            </div>
            

            <Footer />
        </>
    )
}

export default Categories;