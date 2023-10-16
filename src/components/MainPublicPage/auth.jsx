import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from './firebase'; // Import Firebase objects

export const register = (email, password, userName, role) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User registration is successful, handle further actions here.
      const user = userCredential.user;

      const databaseRef = database.ref();
      const user_data = {
        email: email,
        username: userName,
        role: role,
        last_login: Date.now(),
      };

      databaseRef.child('users/' + user.uid).set(user_data);

      alert('User created!');
    })
    .catch((error) => {
      const error_code = error.code;
      const error_message = error.message;

      alert(error_message);
    });
};
