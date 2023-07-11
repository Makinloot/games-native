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
    console.log("user logged in");
  } catch (error) {
    console.log("error", error);
    if (error.code === "auth/user-not-found") setError("User not found.");
    else if (error.code === "auth/wrong-password")
      setError("Incorrect password.");
    else setError("Something went wrong, please try again");
    setSubmitting(false);
  }
};

// sign up user, handle error & loading state
export const registerUser = async (
  email,
  password,
  setSubmitting,
  handleRegister,
  setError
) => {
  try {
    await handleRegister(email, password);
    setError("");
    setSubmitting(false);
    console.log("user registered");
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