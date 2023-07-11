import { View, Text } from "react-native";
import { useAppContext } from "../../utils/context/ContextProvider";
import { Formik } from "formik";
import validationSchema from "../../utils/inputValidationSchema";
import { AntDesign } from "@expo/vector-icons";
import InputField from "../InputField";
import AuthButton from "./AuthButton";
import SpinAnimation from "../SpinAnimation";
import { useState } from "react";

const AuthLogin = () => {
  const { handleLogin } = useAppContext();
  const [error, setError] = useState("");

  const handleSubmit = async (email, password, setSubmitting) => {
    try {
      await handleLogin(email, password);
      setError("");
      setSubmitting(false);
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

  return (
    <View className="w-full max-w-[340px] items-center">
      <Text className="mb-8 self-start font-roboto text-4xl text-white">
        Log in to Whistle
      </Text>

      <AuthButton
        icon={<AntDesign name="google" color="white" size={28} />}
        text="continue with google"
        bgColor="bg-red-500 mb-5"
      />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values.email, values.password, setSubmitting);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          handleBlur,
          touched,
          errors,
          isSubmitting,
        }) => (
          <>
            {isSubmitting && <SpinAnimation iconSize={28} />}
            {!isSubmitting && error && (
              <View className="w-full bg-red-400/60 p-2">
                <Text className="text-center font-robotoBold text-white">
                  {error}
                </Text>
              </View>
            )}
            <InputField
              placeholder="Email"
              handleChange={handleChange("email")}
              value={values.email}
              keyboardType="email-address"
              handleBlur={handleBlur("email")}
              error={touched.email && errors.email && errors.email}
              label="email address"
            />

            <InputField
              placeholder="Password"
              handleChange={handleChange("password")}
              value={values.password}
              secureText
              handleBlur={handleBlur("password")}
              error={touched.password && errors.password && errors.password}
              label="password"
            />

            <AuthButton
              text="login"
              bgColor="bg-lightBlue my-2"
              handleSubmit={handleSubmit}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default AuthLogin;
