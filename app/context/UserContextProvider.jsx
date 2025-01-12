'use client';
import React, { useState } from 'react';
import userContext from './userContext';

const UserContextProvider = ({children}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  return (
    <userContext.Provider value={{name, setName, email, setEmail, password, setPassword}}>
      {children}
    </userContext.Provider>
  );
}

export default UserContextProvider;
