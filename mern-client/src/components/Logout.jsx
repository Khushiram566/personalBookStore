import React, { useContext } from 'react'
import { AuthContext } from '../contects/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom';
import "../dashboard/Dashboard.css"

const Logout = () => {
    const {logOut}=useContext(AuthContext);
    const location=useLocation();
    const navigate=useNavigate();
 
    const from = location.state?.from?.pathname || "/";
    const handleLogout=()=>{
        logOut().then(()=>{
            //sign out successfull
            alert('Sign-out successfull!!');
            navigate(from, { replace: true });
        }).catch((error)=>{
            //an error happened
        })


    }
  return (
    <div class="aboutPhoto3">
      <h1 class="g1">
        welcome to logout page!!
        <h1>click on button to logout the session</h1>
      </h1>

      <button
      
 

        // class="logout1"
        className=" px-8 py-2 tex
 t-white rounded bg-red-600 hover:bg-red-400"

        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout
