import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db, dbRefUsers } from "../../../config/firebase";
import { push, ref, get, remove, child, update } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as StorageRef,
  uploadBytes,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

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
  const [avatar, setAvatar] = useState("");
  const [image, setImage] = useState();
  const [isImageChanged, setIsImageChanged] = useState(0);

  // like & dislike
  const likedItems = async (value) => {
    // Liked collection reference
    const userLikedCollectionRef = ref(db, `liked/${currentUser.uid}`);
    // Create a reference to the user's liked collection
    const likedCollectionSnapshot = await get(userLikedCollectionRef);
    // Check if the item already exists in the collection
    const itemExists =
      likedCollectionSnapshot.exists() &&
      Object.values(likedCollectionSnapshot.val()).includes(value);

    if (itemExists) {
      // Item already exists, remove it from the database
      const itemKey = Object.keys(likedCollectionSnapshot.val()).find((key) => {
        return likedCollectionSnapshot.val()[key] === value;
      });
      if (itemKey) {
        const itemRef = child(userLikedCollectionRef, itemKey);
        await remove(itemRef);
      }
    } else {
      // Item doesn't exist, push it to the database
      push(userLikedCollectionRef, value);
    }
  };

  // pick image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.assets[0].uri };
    setImage(source);
  };

  // upload image to firebase storage
  const uploadImage = async () => {
    try {
      const response = await fetch(image.uri);
      const blob = await response.blob();

      const storage = getStorage();
      const avatarsRef = StorageRef(storage, `avatars/${currentUser.uid}`);

      uploadBytes(avatarsRef, blob).then(() => {
        // cause rerender to display new image
        setIsImageChanged(1);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  // display image
  const displayImage = async () => {
    try {
      const storage = getStorage();
      const avatarsRef = StorageRef(storage, `avatars/${currentUser.uid}`);
      const downloadURL = await getDownloadURL(avatarsRef);
      setAvatar(downloadURL);
    } catch (error) {
      console.log(error);
      setAvatar("");
    }
  };

  useEffect(() => {
    // store current user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // upload & change user avatar
    if (currentUser) {
      uploadImage();
      displayImage();
    }
  }, [currentUser, image?.uri, isImageChanged]);

  return (
    <Context.Provider
      value={{
        handleLogin,
        handleRegister,
        handleResetPsw,
        currentUser,
        handleSignout,
        saveUser,
        likedItems,
        avatar,
        pickImage,
      }}
    >
      {!loading && children}
    </Context.Provider>
  );
};

export { ContextProvider, useAppContext };
