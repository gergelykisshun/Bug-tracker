import React from 'react'
import {useUserInfo} from '../../contexts/UserContextProvider'
import { Link } from 'react-router-dom'
import './Home.css';

const Home = () => {
  const userInfo = useUserInfo();


  return (
    <div className='general-container home-section'>
      <h1>Welcome to <strong className='intro'>Bug-tracker</strong> {userInfo.username}!</h1>
      <h2>You logged in as <strong className='intro'>{userInfo.role}</strong>!</h2>
      <Link to='/my-projects' className='primary-btn home-action-btn'>Take me to my projects</Link>
    </div>
  )
}

export default Home