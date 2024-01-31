import React from 'react';
import Login from '../auth/login';
import Signup from '../auth/signup';
import {useState} from 'react';



const Auth_Layout = () => {
  const [isLogin, setIsLogin] = useState(true);
  const updateState = (newState) => {
    setIsLogin(newState)
  }

  return (
    
    <div>
      {isLogin && <Login updateState={updateState}/>}
      {!isLogin && <Signup updateState={updateState}/>}
    </div>
  )
}

export default Auth_Layout;