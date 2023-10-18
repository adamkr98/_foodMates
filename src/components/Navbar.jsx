import React, { useState } from 'react';
import SignIn from './MainPublicPage/SignIn';
import { Link } from 'react-router-dom'


const Navbar = ({ showSignInForm, handleJoinsUsClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleWindowResize = () => {
    const screenWidth = window.innerWidth;
    setShowButtons(screenWidth > 640);
  };

  window.addEventListener("resize", handleWindowResize);

  const renderButtons = location.pathname === '/' && showButtons;

  return (
    <>
      <div className="w-full h-[10vh] flex justify-center shadow">
        <div className="w-[30%] pl-2 pr-2 sm:w-[30%] md:w-[10%] flex justify-start">
          <p className="w-fit flex justify-center items-center">
            <Link to="/">foodMates</Link>
          </p>
        </div>

        <div className="w-full flex justify-end">
          <ul className="w-[50%] flex justify-end">
            <li className="w-11 mr-8 flex justify-center items-center">About</li>
            <li className="w-11 mr-8 flex justify-center items-center">Contact</li>
          </ul>

          {renderButtons && (
            <div className="w-[8rem] mr-4 flex justify-around">
              <div className="w-full flex justify-around items-center">
                <button onClick={toggleModal} className="w-fit p-2 font-bold rounded-md border-2 border-transparent hover:border-2 hover:border-gray-400">
                  SignIn
                </button>
                <button className="w-fit p-2 rounded-md border-2 border-transparent hover:border-2 hover:border-gray-400">LogIn</button>
              </div>
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
          <SignIn closeSignInModal={toggleModal} />
        </div>
      )}
    </>
  );
};
export default Navbar;
