import React, {useState, useContext} from 'react'

const userContext = React.createContext();

export const useUserInfo = () => {
  return useContext(userContext).userInfo;
}

export const useUpdateUser = () => {
  return useContext(userContext).setUserInfo;
}

const UserContextProvider = ({children}) => {

  const session = JSON.parse(window.sessionStorage.getItem('bug-tracker-session'));
  console.log(session);

  const [userInfo, setUserInfo] = useState({
    username: session ? session.username : '',
    role: session ? session.role : '',
    isLoggedIn: session ? session.isLoggedIn : false
  })


  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </userContext.Provider>
  )
}

export default UserContextProvider;