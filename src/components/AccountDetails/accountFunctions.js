import { get, ref, remove } from "firebase/database";
import { db, dbRefUsers } from "../../../config/firebase";
import { deleteObject, getStorage, ref as StorageRef } from "firebase/storage";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
} from "firebase/auth";

// remove current user's data from database and storage ( account details, avatar & liked items)
export const deleteUserData = async ({ email, uid }) => {
  try {
    // // delete user
    const snapshot = await get(dbRefUsers);
    snapshot.forEach((item) => {
      const user = item.val();
      if (user.email === email) {
        const userRef = ref(db, `users/${item.key}`);
        remove(userRef);
      }
    });

    // // delete user's liked items
    const likedDbRef = ref(db, `liked`);
    const likedSnapshot = await get(likedDbRef);
    likedSnapshot.forEach((item) => {
      if (item.key === uid) {
        const likedRef = ref(db, `liked/${item.key}`);
        remove(likedRef);
      }
      // console.log("liked", item.val());
    });

    // delete user's storage
    const storage = getStorage();
    const avatarsRef = StorageRef(storage, `avatars/${uid}`);
    deleteObject(avatarsRef)
      .then(() => console.log("item removed"))
      .catch((err) => console.log("storage error", err));
  } catch (error) {
    console.log(error);
  }
};

// try to delete user and their data
export const deleteUser = async (currentUser) => {
  try {
    await deleteUserData(currentUser);
    currentUser.delete();
  } catch (error) {
    console.log("error delete", error);
  }
};

// make user reauthenticate then deactivate account
export const deactivateAccount = async (email, password) => {
  const auth = getAuth();
  const user = auth.currentUser;

  // user's credential
  const credential = EmailAuthProvider.credential(email, password);

  if (password) {
    // first try to reauthenticate user
    try {
      await reauthenticateWithCredential(user, credential);

      // after reauthenticate try to delete user
      deleteUser(user);
    } catch (error) {
      console.log("error reauthenticating", error);
    }
  }
};
