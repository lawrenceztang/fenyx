import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.id
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.id);
  };

  const deleteToken = userToken => {
    sessionStorage.removeItem('token');
    setToken(null);
  }

  return {
    setToken: saveToken,
    deleteToken: deleteToken,
    token
  }
}