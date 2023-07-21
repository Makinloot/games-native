import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useAppContext } from "../../utils/context/ContextProvider";
import { Formik } from "formik";
import { registerValidationSchema } from "../../utils/inputValidationSchema";
import InputField from "../InputField";
import AuthButton from "./AuthButton";
import SpinAnimation from "../SpinAnimation";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../../utils/submitFunctions";

const AuthRegister = () => {
  const { handleRegister, saveUser } = useAppContext();
  const [error, setError] = useState("");
  const navigation = useNavigation("Login");

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          registerUser(
            values,
            setSubmitting,
            handleRegister,
            setError,
            navigation,
            saveUser
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
              placeholder="Name"
              handleChange={handleChange("name")}
              value={values.name}
              handleBlur={handleBlur("name")}
              error={touched.name && errors.name && errors.name}
              label="name"
            />

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

            <InputField
              placeholder="Confirm password"
              handleChange={handleChange("confirmPassword")}
              value={values.confirmPassword}
              secureText
              handleBlur={handleBlur("confirmPassword")}
              error={
                touched.confirmPassword &&
                errors.confirmPassword &&
                errors.confirmPassword
              }
              label="confirm password"
            />

            {/* display spin animation while submitting */}
            {isSubmitting ? (
              <View className="py-4">
                <SpinAnimation iconSize={28} />
              </View>
            ) : (
              <AuthButton
                text="register"
                bgColor="bg-lightBlue my-2"
                handleSubmit={handleSubmit}
              />
            )}
          </>
        )}
      </Formik>

      {/* links */}
      <View className="my-3 pb-10">
        <Text className="text-center font-roboto text-white/50">
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-center font-roboto text-white underline">
            Sign in to Whistle
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AuthRegister;
