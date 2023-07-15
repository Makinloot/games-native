import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db, dbRefUsers } from "../../../config/firebase";
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
