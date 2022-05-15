import React, {useState, useEffect} from 'react'
import './SignUp.css'

const SignUp = ({switchHandler, userInput, inputHandler, showErrorMsg, setIsSigningUp}) => {

  const [isChoosingRole, setIsChoosingRole] = useState(false)
  // const [sending, setSending] = useState(false);


  const toggleRole = () => {
    if(userInput.password !== userInput.passwordAgain){
      return showErrorMsg('Passwords you provided don\'t match!');
    }

    //EMAIL FORMAT CHECK
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!regex.test(userInput.email)){
      return showErrorMsg('The e-mail address you entered is not valid!')
    }
    
    setIsChoosingRole(prev => !prev)
  };


  const signUpHandler = () => {
    if(userInput.role === ''){
      return showErrorMsg('Please select a role!');
    }

    fetch('/api/v1/register', {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify(userInput)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      // go back to login page
      setIsChoosingRole(false);
      setIsSigningUp(false);
    })

  };

  return (
    <>
      {
      isChoosingRole ? 
      <>
      <div className='roles-container'>
        <label>
          <input style={{display:'none'}} type="radio" name="role" value={'manager'} onChange={inputHandler} checked={userInput.role === 'manager'}/>
          <button className='role-radio primary-btn'>Manager</button>
        </label>
        <label>
          <input style={{display:'none'}} type="radio" name="role" value={'developer'} onChange={inputHandler} checked={userInput.role === 'developer'}/>
          <button className='role-radio primary-btn'>Developer</button>
        </label>
      </div>
        <button className='primary-btn' onClick={signUpHandler}>Sign up</button>
        <strong onClick={toggleRole}>Back</strong> 
      </> : 
      <>
        <h2>Sign up</h2>
        <input style={{marginTop: 40}}type="text" placeholder='Username' name='username' value={userInput.username} onChange={inputHandler}/>
        <input type="email" placeholder='E-mail address' name='email' value={userInput.email} onChange={inputHandler}/>
        <input type="password" placeholder='Password' name='password' value={userInput.password} onChange={inputHandler}/>
        <input type="password" placeholder='Password again' name='passwordAgain' value={userInput.passwordAgain} onChange={inputHandler}/>
        <button onClick={toggleRole} className='primary-btn'>Choose Role</button>
        <strong onClick={switchHandler}>Back to Login</strong> 
      </>
      }
    </>
)
}

export default SignUp;