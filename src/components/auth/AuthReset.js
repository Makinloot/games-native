import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { useAppContext } from "../../utils/context/ContextProvider";
import InputField from "../InputField";
import { resetPswValidationSchema } from "../../utils/inputValidationSchema";
import AuthButton from "./AuthButton";
import SpinAnimation from "../SpinAnimation";
import { resetPassword } from "../../utils/submitFunctions";
import { useNavigation } from "@react-navigation/native";

const AuthReset = () => {
  const { handleResetPsw } = useAppContext();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigation = useNavigation();
  return (
    <>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={resetPswValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          resetPassword(
            values.email,
            handleResetPsw,
            setSubmitting,
            setError,
            setSuccess
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
            {/* display error  */}
            {!isSubmitting && error && (
              <View className="w-full bg-red-400/60 p-2">
                <Text className="text-center font-robotoBold text-white">
                  {error}
                </Text>
              </View>
            )}
            {/* display success */}
            {!isSubmitting && success && (
              <View className="w-full bg-green-400/60 p-2">
                <Text className="text-center font-robotoBold text-white">
                  {success}
                </Text>
              </View>
            )}
            <InputField
              label="email"
              placeholder="Email"
              handleChange={handleChange("email")}
              handleBlur={handleBlur("email")}
              error={touched.email && errors.email && errors.email}
              value={values.email}
            />
            {/* display spin animation while submitting */}
            {isSubmitting ? (
              <View className="py-4">
                <SpinAnimation iconSize={28} />
              </View>
            ) : (
              <AuthButton
                text="reset password"
                bgColor="bg-lightBlue my-2"
                handleSubmit={handleSubmit}
              />
            )}
          </>
        )}
      </Formik>
      {/* links */}
      <View className="flex-row justify-center pb-10">
        <TouchableOpacity
          className="my-2 mr-2"
          onPress={() => navigation.navigate("Login")}
        >
          <Text className="font-roboto text-sm text-white underline">
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="my-2 ml-2"
          onPress={() => navigation.navigate("Register")}
        >
          <Text className="font-roboto text-sm text-white underline">
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AuthReset;
