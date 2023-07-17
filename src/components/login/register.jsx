import { useState } from "react";
import { auth, db } from "../../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");

  function register(){
    if( validate_field(email)==false || 
        validate_field(password) == false || 
        validate_field(fname)==false ||
        validate_field(lname)==false ||
        validate_field(role)==false 
    ){
      console.log(role);
      alert("incomplete fields");
      return
    }
    
    if(validate_email(email) == false  || validate_password(password) == false){
      alert("invalid email/password");
      return
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Set custom attributes
      const customAttributes = {
        fname: fname,
        lname: lname,
        role: role,
        // Add more custom attributes as needed
      };

      const userDocRef = doc(db, "Users", user.uid);
      return setDoc(userDocRef, customAttributes)
        .then(() => {
          // Custom attributes saved to Firestore
          console.log("Custom attributes saved to Firestore successfully");
          alert("Successful registration");
          // ...
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle errors
      alert(error);
      console.log(error);
      // ...
    });

  }

  return <div>
    <input 
      placeholder="Email"
      onChange={(e)=>setEmail(e.target.value)}
    />
    <input 
      placeholder="Password"
      onChange={(e)=>setPassword(e.target.value)}
    />
    <input 
      placeholder="First Name"
      onChange={(e)=>setFname(e.target.value)}
    />
    <input 
      placeholder="Last Name"
      onChange={(e)=>setLname(e.target.value)}
    />
    
    <input 
      placeholder="Role"
      onChange={(e)=>setRole(e.target.value)}
    />
    <button onClick={register}>Sign up</button>
  </div>
}


function validate_email(email) {
  const expression = /^\w{8}@usc\.edu\.ph$/;
  return expression.test(email);
}

  function validate_password(password) {
    return password.length >= 6;
  }

  function validate_field(field){
    if(field == null){
      return false;
    }else if(field.length <= 0){
      return false;
    }else{
      return true;
    }
  }