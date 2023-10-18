import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { database } from '../MainPublicPage/firebase';

import Navbar from '../Navbar';
import Footer from '../Footer';

const db = getDatabase();
const vegetablesRef = ref(db, 'categories/1/products');

const Vegetables = () => {
    const [vegetablesData, setVegetablesData] = useState(null);

    useEffect(() => {
        get(vegetablesRef)
            .then((vegetablesData) => {
                if (vegetablesData.exists()) {
                    const data = vegetablesData.val();
                    setVegetablesData(data);
                } else {
                    console.log('No data available for Vegetables');
                }
            })
            .catch((error) => {
                console.error('Error getting Vegetables data:', error);
            });
    }, []);

    return (
        <div className='w-full flex flex-col'>
            <div className='w-[90%] h-[10vh] mt-[5vh] flex justify-end items-center'>
                <h1 className='text-[2rem]'>Vegetables</h1>
            </div>            

            <div className='w-2/4 h-[15vh] flex justify-around'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>

                <input type="text" placeholder='Search' className='w-1/2 h-[2rem] mt-12 pl-4 border-b-2 rounded-md focus:outline-none' />
            </div>

            <div className='w-[90%] h-[52vh] flex'>
                {vegetablesData && Object.keys(vegetablesData).map((vegetableId) => {
                    const vegetable = vegetablesData[vegetableId];
                    return (
                        <div className='w-[20%] h-[20vh] flex border border-red-400' key={vegetableId}>
                            <div key={vegetableId}>
                                <h2>{vegetable.name}</h2>
                                <p>Date Harvested: {vegetable.dateHarvested}</p>
                                <p>Quantity: {vegetable.quantity}</p>
                                {/* Render other vegetable details */}
                            </div>
                        </div>
                    );
                })}
            </div>

            <Footer />
        </div>
    );
};

export default Vegetables;
