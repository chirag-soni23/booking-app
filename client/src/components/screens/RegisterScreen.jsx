import React, { useState } from 'react';

function RegisterScreen() {
    const [name,setname] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [cpassword,setcPassword] = useState("")
    function register(){
        if(password == cpassword){
                const user={
                    name,
                    email,
                    password,
                    cpassword

                }
                console.log(user);
            }
            else{
                alert("Password dosen't match")
            }
    }
  return (
    <div className="container">
      <div className="row justify-content-center mt-5 ">
        <div className="col-md-5 bs">
          <h2>Register</h2>
          <input type="text" className="form-control" placeholder="Enter Your name"  value={name} onChange={(e)=>{setname(e.target.value)}}/>
          <input type="email" className="form-control" placeholder="Enter Your Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
          <input type="password" className="form-control" placeholder="Enter Your Password"  value={password} onChange={(e)=>{
            setPassword(e.target.value)
          }}/>
          <input type="password" className="form-control" placeholder="Enter Confirm Password" value={cpassword} onChange={(e)=>{
            setcPassword(e.target.value)
          }} />
          <button className='btn mt-3' onClick={register} >Register</button>
                </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
