import { useState } from "react";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (user.uid === "MOaqu8jBfGMh4QpdWQ48ETYWGuO2") {
        onClose("YES");
      } else {
        onClose("NO");
      }
    } catch (error) {
      console.log("Error:", error.code, error.message);
    }
  };

  const handleClose = () => {
    setIsVisible(false); // Set the visibility to false to hide the component

    if (onClose) {
      onClose("NO"); // Call the onClose function provided by the parent component with "NO"
    }
  };

  if (!isVisible) {
    return null; // Return null to hide the component
  }

  return (
    <div className="overlay">
      <div className="expanded-card">
        <div className="card col-4 insertEquipment">
          <div className="card-header">
            <div className="row">
              <div className="col-11">
                <h5 className="card-title">LOGIN DETAILS</h5>
              </div>
              <div className="col-1 text-right">
                <button className="btn btn-close" onClick={handleClose}></button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <input
              className="form-control"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="form-control"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary" onClick={signIn}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



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