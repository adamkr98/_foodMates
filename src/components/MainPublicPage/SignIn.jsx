import React, { useState, useRef } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from './firebase'; // Import Firebase objects
import Login from './LogIn';

const SignIn = ({ closeSignInModal }) => {
  const [isClosed, setIsClosed] = useState(false);
  const [isSignUpForm, setIsSignUpForm] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();
  const userNameRef = useRef();
  const roleRef = useRef();
  const confPasswordRef = useRef();

  const toggleForm = () => {
    setIsSignUpForm(!isSignUpForm);
  };

  const toggleCloseSignIn = () => {
    setIsClosed(true);
    closeSignInModal();
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateField = (field) => {
    return field.trim() !== '';
  };

  const handleRegister = () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const userName = userNameRef.current.value.trim();
    const role = roleRef.current.value.trim();

    

    if (!validateField(email) || !validateField(password) || !validateField(userName) || !validateField(role)) {
      alert('One or more fields are incorrectly filled');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const databaseRef = ref(database);
        const user_data = {
          email: email,
          username: userName,
          role: role,
          last_login: Date.now(),
        };

        set(ref(database, 'users/' + user.uid), user_data);
        alert('User created!');


        emailRef.current.value = '';
        passwordRef.current.value = '';
        confPasswordRef.current.value = "";
        userNameRef.current.value = '';
        roleRef.current.value = '';

       
      })
      .catch((error) => {
        const error_code = error.code;
        const error_message = error.message;
        alert(error_message);
      });
  };

  return (
    <div className="w-full relative flex justify-center items-center">
      {!isClosed && (
        <div className="w-[40rem] max-w-[90%] h-[70vh] bg-[#e8ebee] md:bg-green-400 rounded-sm relative">
          

          <button onClick={toggleCloseSignIn} className="absolute p-2 top-2 right-4">
            X
          </button>

          <div className='w-full mt-8 mb-4 flex justify-center'>
            <p className='text-2xl'>Hello, Nice to met You!</p>
          </div>

          <form action="" className="w-full h-fit flex flex-col items-center">
            
            <div className="w-[80%] mb-4 mt-4 flex flex-col items-center">
              
              <label htmlFor="email" className="w-[80%] pb-2">
                Email
              </label>
              <input type="email" id="email" className="w-[80%] h-[2.5rem] pl-4 rounded-md border-b border-b-red-600" required ref={emailRef} />
            </div>

            <div className="w-[80%] mb-4 flex justify-center">

              <div className='w-[40%] flex flex-col items-start'>
                <label htmlFor="password" className="pb-2">
                  Password
                </label>
                <input type="password" ref={passwordRef} className="w-[90%] h-[2.5rem] pl-4 rounded-md border-b border-b-red-600" required />
              </div>

              <div className='w-[40%] flex flex-col items-end'>
                <label htmlFor="password-confirm" className="w-[90%] pb-2">
                  Password Confirmation
                </label>
                <input type="password" ref={confPasswordRef} className="w-[90%] h-[2.5rem] pl-4 rounded-md border-b border-b-red-600" />
              </div>
            </div>

            <div className="w-[70%] mb-4 flex justify-around">

              <div className='w-[40%] flex flex-col'>

                <label htmlFor="username" className="pb-2">
                  User Name
                </label>
                <input type="text" id="userName" className="w-full h-[2.5rem] pl-4 rounded-md border-b border-b-red-600" ref={userNameRef} />
             
              </div>

              <div className="w-[40%] mb-4 flex flex-col items-center">

                <label htmlFor="role" className='w-full pb-2'>Role</label>
                <select id="role" className="w-full h-[2.5rem] bg bg-white" ref={roleRef}>
                  <option>Buyer</option>
                  <option>Seller</option>
                </select>

              </div>
              
            </div>

           
            
            <div className='border border-red-400 w-[20%] flex items-center'>
            <button
                    type="button"
                    onClick={handleRegister}
                    className="bg bg-[#606C38] pb-2 pt-2 pl-4 pr-4 hover:bg-[#7f8f49] mb-4 rounded-md text-white flex"
                  >
                    Sign Up
                  </button>
                  <button onClick={toggleForm} className='flex'>
                    Log In
                  </button>
            </div>
          </form>
          
        </div>
      )}
    </div>
  );
};

export default SignIn;
