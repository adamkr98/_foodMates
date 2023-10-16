
import React, { useState } from 'react';
// import SignIn from './SignIn';

const Modal = () => {



    return (
        <div className='w-[40rem] h-[15rem] bg bg-white absolute top-[25%] left-[25%]'>
            <button>x</button>
            <form action="">
                <label htmlFor="">Name</label>
                <input type="text" placeholder='name' />
            </form>
        </div>
    )
}

export default Modal;
