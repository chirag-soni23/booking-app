import React, { useState } from 'react';

function LoginScreen() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
   
    function Login(){
                const user={
             
                    email,
                    password,
             

                }
                console.log(user);
            
    }
  return (
    <div className="container">
      <div className="row justify-content-center mt-5 ">
        <div className="col-md-5 bs">
          <h2>Login</h2>
          <input type="email" className="form-control" placeholder="Enter Your Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
          <input type="password" className="form-control" placeholder="Enter Your Password"  value={password} onChange={(e)=>{
            setPassword(e.target.value)
          }}/>
          <button className='btn mt-3' onClick={Login} >Login</button>
                </div>
      </div>
    </div>
  );
}

export default LoginScreen;
