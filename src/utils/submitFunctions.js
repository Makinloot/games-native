import uuid from "react-native-uuid";
// sign in user, handle error & loading state
export const loginUser = async (
  email,
  password,
  setSubmitting,
  handleLogin,
  setError,
  navigation
) => {
  try {
    await handleLogin(email, password);
    setError("");
    setSubmitting(false);
    navigation.navigate("Home");
  } catch (error) {
    console.log("error", error);
    if (error.code === "auth/user-not-found") setError("User not found.");
    else if (error.code === "auth/wrong-password")
      setError("Incorrect password.");
    else if (error.code === "auth/too-many-requests")
      setError(
        "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
      );
    else setError("Something went wrong, please try again");
    setSubmitting(false);
  }
};

// sign up user, handle error & loading state
export const registerUser = async (
  values,
  setSubmitting,
  handleRegister,
  setError,
  navigation,
  saveUser
) => {
  try {
    const { email, name, password } = values;
    await handleRegister(email, password);
    setError("");
    setSubmitting(false);
    saveUser({
      id: uuid.v4(),
      email: email,
      name: name,
    });
    navigation.navigate("Home");
  } catch (error) {
    console.log("error", error);
    if (error.code === "auth/email-already-in-use")
      setError("Email already in use.");
    else if (error.code === "auth/invalid-email") setError("Invalid Email");
    else setError("Something went wrong, please try again");
    setSubmitting(false);
  }
};

// reset password, handle error & loading state
export const resetPassword = async (
  email,
  handleResetPsw,
  setSubmitting,
  setError,
  setSuccess
) => {
  try {
    await handleResetPsw(email);
    setError("");
    setSuccess("Instructions are sent to Email");
    setSubmitting(false);
  } catch (error) {
    if (error.code === "auth/user-not-found") setError("User not found.");
    else if (error.code === "auth/invalid-email") setError("Invalid Email");
    else setError("Something went wrong, please try again");
    setSubmitting(false);
    console.log(error);
  }
};
