import { useState } from 'react';

export default function useToken() {

  const getUserToken = () => {
    const tokenString = localStorage.getItem('token');
    const expiry = JSON.parse(tokenString)?.expiry;
    const timeNow = new Date().getTime()
    console.log(expiry)
    console.log(timeNow)
    if ( timeNow < expiry ) {
      const userToken = JSON.parse(tokenString);
      return userToken?.token
    } else {
      localStorage.clear()
      return null
    }
  }

  const [userToken, setUserToken] = useState(getUserToken());

  const saveToken = userToken => {
    let tokenString = JSON.stringify({
      'token': userToken.token,
      'expiry': new Date().getTime() + 10000
    })
    localStorage.setItem('token', tokenString);
    setUserToken(userToken.token)
  }

  return {
    setUserToken: saveToken,
    userToken
  }
}