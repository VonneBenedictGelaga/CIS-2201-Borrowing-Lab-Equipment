import React from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Login } from "./login/login.jsx"
import { Register } from "./login/register.jsx"

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const MainPage = ({ isSignedIn }) => {
  return (
    <main>
      <div>
        {isSignedIn?(<p>Hello</p>):(<Login/>)}
      </div>
    </main>
  );
};

export default MainPage;