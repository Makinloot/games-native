import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useAppContext } from "../../utils/context/ContextProvider";
import { Formik } from "formik";
import { loginValidationSchema } from "../../utils/inputValidationSchema";
import InputField from "../InputField";
import AuthButton from "./AuthButton";
import SpinAnimation from "../SpinAnimation";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../../utils/submitFunctions";

const AuthLogin = () => {
  const { handleLogin } = useAppContext();
  const [error, setError] = useState("");
  const navigation = useNavigation();

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          loginUser(
            values.email,
            values.password,
            setSubmitting,
            handleLogin,
            setError,
            navigation
          );
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
            {/* display error */}
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

            {/* display spin animation while submitting */}
            {isSubmitting ? (
              <SpinAnimation iconSize={28} />
            ) : (
              <AuthButton
                text="login"
                bgColor="bg-lightBlue my-2"
                handleSubmit={handleSubmit}
              />
            )}
          </>
        )}
      </Formik>

      {/* links */}
      <View className="pb-10">
        <TouchableOpacity
          className="mb-3 mt-5"
          onPress={() => navigation.navigate("ResetPsw")}
        >
          <Text className="text-center font-roboto text-sm text-white underline">
            Forgot your password?
          </Text>
        </TouchableOpacity>
        <View>
          <Text className="text-center font-roboto text-white/50">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="text-center font-roboto text-white underline">
              Sign up for Whistle
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default AuthLogin;
