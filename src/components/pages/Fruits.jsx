import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { database } from '../MainPublicPage/firebase';

import Navbar from '../Navbar';
import Footer from '../Footer';

const db = getDatabase();
const fruitsRef = ref(db, 'categories/0/products');

const Fruits = () => {
    const [fruitsData, setFruitsData] = useState(null);

    useEffect(() => {
        get(fruitsRef)
            .then((fruitsData) => {
                if (fruitsData.exists()) {
                    const data = fruitsData.val();
                    setFruitsData(data);
                } else {
                    console.log('No data available for Fruits');
                }
            })
            .catch((error) => {
                console.error('Error getting Fruits data:', error);
            });
    }, []);

    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-[90%] h-[10vh] mt-[5vh] flex justify-end items-center'>
                <h1 className='text-[2rem]'>Fruits</h1>
            </div>            

            <div className='w-[90%] h-[15vh] flex flex-col'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>

                <input type="text" placeholder='Search' className='w-[25%] h-[2rem] mt-12 ml-12 pl-4 border-b-2 rounded-md focus:outline-none' />
            </div>

            <div className='w-[90%] h-[52vh] flex justify-center'>
                {fruitsData && Object.keys(fruitsData).map((fruitId) => {
                    const fruit = fruitsData[fruitId];
                    return (
                        <div className='w-[100%] h-fit bg bg-gray-100 pt-8 flex justify-center overflow-hidden' key={fruitId}>
                            <div key={fruitId} className='w-full overflow-hidden flex flex-col items-center'>

                                <div className='w-2/4 h-[30vh] flex justify-center'>
                                    <img src={fruit.imageUrl} alt="" className='object-contain w-full h-full' />
                                </div>
                                <h2>{fruit.name}</h2>
                                <p>Date Harvested: {fruit.dateHarvested}</p>
                                <p>Quantity: {fruit.quantity}</p>
                                
                            </div>
                        </div>
                    );
                })}
            </div>

            <Footer />
        </div>
    );
};

export default Fruits;
