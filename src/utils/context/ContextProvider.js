import React, { useContext } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../config/firebase";

// context
const Context = React.createContext(null);

// use context
const useAppContext = () => {
  return useContext(Context);
};

// handle login with email & password
const handleLogin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// handle register with email & password
const handleRegister = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// handle reset password
export const handleResetPsw = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// context provider
const ContextProvider = ({ children }) => {
  return (
    <Context.Provider
      value={{
        handleLogin,
        handleRegister,
        handleResetPsw,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, useAppContext };
