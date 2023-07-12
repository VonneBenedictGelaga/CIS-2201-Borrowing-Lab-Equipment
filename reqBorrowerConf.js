import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBn_gzQmVisrmR9fRkJSqpbOu-WUnsrm4",
  authDomain: "borrowing-lab-equipment.firebaseapp.com",
  projectId: "borrowing-lab-equipment",
  storageBucket: "borrowing-lab-equipment.appspot.com",
  messagingSenderId: "1027975059625",
  appId: "1:1027975059625:web:94366663f96cad9057b1b8",
  measurementId: "G-84F2H3XZSS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        const user = auth.currentUser;
        if (user && user.email.endsWith("usc.edu.ph")) {
          resolve(true); // User is authenticated with a USC email
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { signInWithGoogle };