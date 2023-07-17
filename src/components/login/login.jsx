import { useState } from "react";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
<<<<<<< HEAD

=======
>>>>>>> f1c24b278bdbd51c52dbecc9a280c3b121fb9cd6

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

<<<<<<< HEAD
  function login (){
    if(validate_field(email)===false || validate_field(password) === false){
      alert("incomplete fields");
      return
    }
    
    if(validate_email(email) === false  || validate_password(password) === false){
      alert("email or password incorrect");
      return
    }

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      alert("logged in successfully");
    })
    .catch((error)=>{
      alert(error);
    })

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
    <button onClick={login}>Sign in</button>
  </div>
}
=======
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User signed in successfully
    } catch (error) {
      console.log("Error:", error.code, error.message);
    }
  };

  return (
    <div>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign in</button>
    </div>
  );
};
>>>>>>> f1c24b278bdbd51c52dbecc9a280c3b121fb9cd6


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