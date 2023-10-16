import React, { useState, useRef } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from './firebase'; // Import Firebase objects

const SignIn = ({ closeSignInModal }) => {
  const [isClosed, setIsClosed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();
  const userNameRef = useRef();
  const roleRef = useRef();

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
    const emailValue = email.trim();
    const passwordValue = password;
    const userNameValue = userName.trim();
    const roleValue = role.trim();

    if (!validateField(emailValue) || !validateField(passwordValue) || !validateField(userNameValue) || !validateField(roleValue)) {
      alert('One or more fields are incorrectly filled');
      return;
    }

    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        const user = userCredential.user;
        const databaseRef = ref(database);
        const user_data = {
          email: emailValue,
          username: userNameValue,
          role: roleValue,
          last_login: Date.now(),
        };

        set(ref(database, 'users/' + user.uid), user_data);
        alert('User created!');

        // Clear input fields after submission
        setEmail('');
        setPassword('');
        setUserName('');
        setRole('');
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
        <div className="w-[40rem] max-w-[90%] h-[70vh] bg-[#e8ebee] md:bg-green-400 rounded-sm">
          <div className='w-full mt-8 mb-4 flex justify-center'>
            <p className='text-2xl'>Hello, Nice to meet You!</p>
          </div>

          <form action="" className="w-full h-fit flex flex-col items-center">
            <div className="w-[80%] mb-4 mt-4 flex flex-col items-center">
              <label htmlFor="email" className="w-[80%] pb-2">
                Email
              </label>
              <input type="email" id="email" className="w-[80%] h-[2.5rem] pl-4 rounded-md border-b border-b-red-600" required ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="w-[80%] mb-4 flex justify-center">
              <div className='w-[40%] flex flex-col items-start'>
                <label htmlFor="password" className="pb-2">
                  Password
                </label>
                <input type="password" ref={passwordRef} className="w-[90%] h-[2.5rem] pl-4 rounded-md border-b border-b-red-600" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className='w-[40%] flex flex-col items-end'>
                <label htmlFor="password-confirm" className="w-[90%] pb-2">
                  Password Confirmation
                </label>
                <input type="password" className="w-[90%] h-[2.5rem] pl-4 rounded-md border-b border-b-red-600" />
              </div>
            </div>

            <div className="w-[70%] mb-4 flex justify-around">
              <div className='w-[40%] flex flex-col'>
                <label htmlFor="username" className="pb-2">
                  User Name
                </label>
                <input type="text" id="userName" className="w-full h-[2.5rem] pl-4 rounded-md border-b border-b-red-600" ref={userNameRef} value={userName} onChange={(e) => setUserName(e.target.value)} />
              </div>
              <div className="w-[40%] mb-4 flex flex-col items-center">
                <label htmlFor="role" className='w-full pb-2'>Role</label>
                <select id="role" className="w-full h-[2.5rem] bg bg-white" ref={roleRef} value={role} onChange={(e) => setRole(e.target.value)}>
                  <option>Buyer</option>
                  <option>Seller</option>
                </select>
              </div>
            </div>

            <button type="button" onClick={handleRegister} className="bg bg-[#606C38] pb-2 pt-2 pl-4 pr-4 hover:bg-[#7f8f49] mb-4 rounded-md text-white">
              SignUp
            </button>
          </form>
          <button onClick={toggleCloseSignIn} className="absolute top-0 right-0">
            x
          </button>
        </div>
      )}
    </div>
  );
};

export default SignIn;
