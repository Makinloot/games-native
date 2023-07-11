import React, { useContext } from "react";
import {
  createUserWithEmailAndPassword,
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

// context provider
const ContextProvider = ({ children }) => {
  return (
    <Context.Provider
      value={{
        handleLogin,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, useAppContext };
