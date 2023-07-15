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

export function getLikedItems(id) {
  const [likes, setLikes] = useState({});
  const likedDbRef = ref(db, `liked`);

  useEffect(() => {
    onValue(likedDbRef, (snapshot) => {
      snapshot.forEach((item) => {
        const likedListKey = item.key;
        if (likedListKey === id) {
          const keys = Object.keys(item.val());
          const idsFromObj = keys.map((id) => item.val()[id]).join(", ");
          setLikes(idsFromObj);
        }
      });
    });
  }, []);

  return likes;
}
