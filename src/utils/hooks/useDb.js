import { useState, useEffect } from "react";
import { onValue } from "firebase/database";
import { dbRefUsers } from "../../../config/firebase";
export function getUser() {
  const [user, setUser] = useState({});
  useEffect(() => {
    onValue(dbRefUsers, (snapshot) => {
      snapshot.forEach((item) => {
        const user = item.val();
        setUser(user);
      });
    });
  }, []);

  return user;
}
