import React from 'react';
import Navbar from './../Navbar';
import Footer from '../Footer';

const Categories = () => {
    return (
        <>
            <Navbar />
            <h1></h1>
            <div className='w-full h-[80vh] flex items-center '>
                <div className="w-1/4 h-[60vh] flex items-center justify-center">
                    <img
                        src="https://source.unsplash.com/Oc3fP0FXJbU"
                        alt=""
                        width="300"
                        className="max-w-full max-h-full"
                    />
                </div>
                <div className="w-1/4 h-[60vh] object-cover flex items-center justify-center">
                    <img
                        src="https://source.unsplash.com/90Ro3YkIuec"
                        alt=""
                        width="300"
                        className="max-w-full max-h-full"
                    />
                </div>
                <div className="w-1/4 h-[60vh] object-cover flex items-center justify-center">
                    <img
                        src="https://source.unsplash.com/AQ_BdsvLgqA"
                        alt=""
                        width="300"
                        className="max-w-full max-h-full"
                    />
                </div>
                <div className="w-1/4 h-[60vh] object-cover flex items-center justify-center overflow-hidden">
                    <img
                        src="https://source.unsplash.com/QGIJUqnEpCY"
                        alt=""
                        width="300"
                        className="max-w-full max-h-full"
                    />

            
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Categories;