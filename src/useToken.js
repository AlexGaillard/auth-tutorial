import { useState } from 'react';

export default function useToken() {
  const getUserToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
  }

  const [userToken, setUserToken] = useState(getUserToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken.token));
    setUserToken(userToken.token)
  }

  return {
    setUserToken: saveToken,
    userToken
  }
}