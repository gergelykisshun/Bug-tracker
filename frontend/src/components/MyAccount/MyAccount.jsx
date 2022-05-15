import React from 'react'
import {useUserInfo, useUpdateUser} from '../../contexts/UserContextProvider';
import './MyAccount.css';

const MyAccount = () => {
  const userInfo = useUserInfo();
  const setUser = useUpdateUser();

  const logoutHandler = () => {
    fetch('/api/v1/logout').then(() => {
      setUser({
        username: '',
        role: '',
        isLoggedIn: false
      });
      window.sessionStorage.clear();
    })
  };

  return (
    <div className='general-container my-account'>
      <h2>My account</h2>
      <p><strong>Username</strong>: {userInfo.username}</p>
      <p><strong>Role</strong>: {userInfo.role}</p>
      <button onClick={logoutHandler} className='primary-btn'>Logout</button>
    </div>
  )
}

export default MyAccount