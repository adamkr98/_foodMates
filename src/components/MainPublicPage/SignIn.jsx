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
    // ... (rest of your component code)

    <input type="email" id="email" className="w-[80%] h-[2.5rem] pl-4 rounded-md border-b border-b-red-600" required ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} />

    <input type="password" ref={passwordRef} className="w-[90%] h-[2.5rem] pl-4 rounded-md border-b border-b-red-600" required value={password} onChange={(e) => setPassword(e.target.value)} />

    <input type="text" id="userName" className="w-full h-[2.5rem] pl-4 rounded-md border-b border-b-red-600" ref={userNameRef} value={userName} onChange={(e) => setUserName(e.target.value)} />

    <select id="role" className="w-full h-[2.5rem] bg bg-white" ref={roleRef} value={role} onChange={(e) => setRole(e.target.value)}>
      {/* ... (options) */}
    </select>

    // ... (rest of your component code)
  );
};

export default SignIn;
