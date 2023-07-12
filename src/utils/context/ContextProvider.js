import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db, dbRefUsers } from "../../../config/firebase";
import { push, ref } from "firebase/database";

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
const handleResetPsw = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// handle sign out
const handleSignout = () => {
  return signOut(auth);
};

// push user in database
const saveUser = (value) => {
  push(dbRefUsers, value);
};

// context provider
const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  return (
    <Context.Provider
      value={{
        handleLogin,
        handleRegister,
        handleResetPsw,
        currentUser,
        handleSignout,
        saveUser,
      }}
    >
      {!loading && children}
    </Context.Provider>
  );
};

export { ContextProvider, useAppContext };
