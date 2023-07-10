import React, { useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";

// context
const Context = React.createContext(null);

// use context
const useAppContext = () => {
  return useContext(Context);
};

// handle login with email & password
const handleLogin = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// test func
const handleCurrentUser = () => {
  return auth.currentUser;
};

// context provider
const ContextProvider = ({ children }) => {
  return (
    <Context.Provider
      value={{
        handleLogin,
        handleCurrentUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, useAppContext };
