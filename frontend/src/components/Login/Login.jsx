import React, {useEffect, useState} from 'react'
import './Login.css';
import SignUp from '../SignUp/SignUp';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import {useUpdateUser} from '../../contexts/UserContextProvider';
import AdbIcon from '@mui/icons-material/Adb';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';




const Login = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [posting, setPosting] = useState(false);

  const setUserContext = useUpdateUser();

  const [userInput, setUserInput] = useState({
    username: '',
    password: '',
    passwordAgain: '',
    email: '',
    role: ''
  })

  const [error, setError] = useState({
    isVisible: false,
    msg: ''
  })

  const showErrorMsg = (msg) => {
    setError({
      isVisible: true,
      msg: msg
    })
  }

  useEffect(() => {
    if(posting){
      fetch('/api/v1/login',{
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(userInput)
      })
      .then(res => res.json())
      .then(data => {
        window.sessionStorage.setItem('bug-tracker-session', JSON.stringify(data))
        setUserContext(data)
      })
      .catch(err => showErrorMsg('Wrong username or password!'))
    }

    return () => {setPosting(false)}
  }, [posting])


  const inputHandler = (e) => {
    const {name, value} = e.target;
    setUserInput(prev => ({
      ...prev,
      [name]: value
    }))
  };

  const switchHandler = () => {
    setIsSigningUp(prev => !prev)
  };

  
  const loginHandler = () => {
    if(!userInput.username || !userInput.password){
      return showErrorMsg('Please enter your credentials!');
    }
    setPosting(true);
  };

  const autoFillInput = () => {
    setUserInput({
      username: 'Jon',
      password: 'jon'
    })
  };

  return (
    <section className='login-section'>
      {error.isVisible && <ErrorMsg msg={error.msg} setError={setError}/>}
      <form onSubmit={(e) => e.preventDefault()} className='login-form'>
        <div className='login-bug-tracker'>
          <h1 className='login-title'>
            Bug-tracker
            <AdbIcon />
          </h1>
        </div>
        {isSigningUp ? 
        <SignUp userInput={userInput} inputHandler={inputHandler} switchHandler={switchHandler} showErrorMsg={showErrorMsg} setIsSigningUp={setIsSigningUp}/> :
        <>
          <h2>
            Login
            <Tooltip className='tool-tip-style' title="Easy-login autofill" arrow>
              <InfoIcon onClick={autoFillInput}/>
            </Tooltip>
          </h2>
          <input type="text" placeholder='Username' name='username' value={userInput.username} onChange={inputHandler}/>
          <input type="password" placeholder='Password' name='password' value={userInput.password} onChange={inputHandler}/>
          <button onClick={loginHandler} className='primary-btn'>Login</button>
          <p>Don't have an account yet? <strong onClick={switchHandler}>Sign up now</strong></p> 
        </>
        }
      </form>
    </section>
  )
}

export default Login