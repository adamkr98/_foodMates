import React, { useState, useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // Import Firebase auth object

const Login = ({ closeLoginModal }) => {
  const [isClosed, setIsClosed] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const toggleCloseLogin = () => {
    setIsClosed(true);
    closeLoginModal();
  };

  const validateField = (field) => {
    return field.trim() !== '';
  };

  const handleLogin = () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    if (!validateField(email) || !validateField(password)) {
      alert('Please enter both email and password.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Handle successful login (e.g., navigate to another page)
        alert('Logged in successfully');
      })
      .catch((error) => {
        const error_message = error.message;
        alert(error_message);
      });
  };

  return (
    <div className="w-full relative flex justify-center items-center">
      {!isClosed && (
        <div className="w-[40rem] max-w-[80%] h-[70vh] bg-[#e8ebee] md:bg-green-400 rounded-sm">
          <form action="" className="w-full h-fit flex flex-col items-center">
            <div className="w-[98%] mb-4 mt-4 flex flex-col items-center">
              <label htmlFor="email" className="pb-2">
                Email
              </label>
              <input type="email" id="email" className="w-1/2" required ref={emailRef} />
            </div>
            <div className="w-[98%] mb-4 flex flex-col items-center">
              <label htmlFor="password" className="pb-2">
                Password
              </label>
              <input type="password" ref={passwordRef} className="w-1/2" required />
            </div>
            <button type="button" onClick={handleLogin} className="mb-4">
              Login
            </button>
          </form>
          <button onClick={toggleCloseLogin} className="ml-4 mt-2 absolute right-4">
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
