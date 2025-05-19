import React, { useState } from 'react';
import Loader from './Loader';

const LoginButton = ({ loginUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await loginUser();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleLogin} disabled={isLoading}>
      {isLoading ? <Loader /> : 'Login'}
    </button>
  );
};

export default LoginButton;