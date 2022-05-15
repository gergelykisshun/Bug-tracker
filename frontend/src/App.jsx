import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { useUserInfo } from './contexts/UserContextProvider';
import {Layout} from './components/Layout/Layout';
import AssignProjects from './components/AssignProjects/AssignProjects';
import AssignRoles from './components/AssignRoles/AssignRoles';
import NewProject from './components/NewProject/NewProject';
import MyProjects from './components/MyProjects/MyProjects';
import MyTickets from './components/MyTickets/MyTickets';
import MyAccount from './components/MyAccount/MyAccount';


const App = () => {

  const isLoggedIn = useUserInfo().isLoggedIn;
  const context = useUserInfo();
  console.log(context);

  return (
    !isLoggedIn ? 
    <Login/> :
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home/>} exact/>
            <Route path='/assign-roles' element={<AssignRoles/>}/>
            <Route path='/assign-projects' element={<AssignProjects/>}/>
            <Route path='/my-projects' element={<MyProjects/>}/>
            <Route path='/my-tickets' element={<MyTickets/>}/>
            <Route path='/new-project' element={<NewProject/>}/>
            <Route path='/my-account' element={<MyAccount/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
  )
}

export default App