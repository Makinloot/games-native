import { useState, useEffect } from "react";
import { onValue, ref, update, get } from "firebase/database";
import { db, dbRefUsers } from "../../../config/firebase";

// get users from db
export function getUser(email) {
  const [user, setUser] = useState({});
  useEffect(() => {
    onValue(dbRefUsers, (snapshot) => {
      snapshot.forEach((item) => {
        const user = item.val();
        if (user.email === email) setUser(user);
      });
    });
  }, []);

  return user;
}

// update user
export async function updateUser(email, keyName, newValue) {
  try {
    const snapshot = await get(dbRefUsers);
    snapshot.forEach((item) => {
      const user = item.val();
      if (user.email === email) {
        const updates = {};
        // if name is being updated
        if (keyName === "name") updates[item.key] = { ...user, name: newValue };
        update(dbRefUsers, updates);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// return array of liked items ids
export function getLikedItems(id) {
  const [likes, setLikes] = useState([]);
  const likedDbRef = ref(db, `liked`);
  let ids = [];

  useEffect(() => {
    onValue(likedDbRef, (snapshot) => {
      snapshot.forEach((item) => {
        const likedListKey = item.key;
        if (likedListKey === id) {
          const keys = Object.keys(item.val());
          const idsFromObj = keys.map((id) => item.val()[id]);
          setLikes(idsFromObj);
        }
      });
    });
  }, []);

  return likes;
}
