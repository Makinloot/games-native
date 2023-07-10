import { View, Text, TouchableOpacity } from "react-native";
import { useAppContext } from "../../utils/context/ContextProvider";
import { Formik } from "formik";
import * as Yup from "yup";
import InputField from "../InputField";

const AuthLogin = () => {
  const { handleLogin } = useAppContext();

  const handleSubmit = async (email, password) => {
    try {
      await handleLogin(email, password);
      console.log("user logged in");
    } catch (error) {
      console.log("error", error);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <View className="w-[240px] items-center">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log(actions);
          handleSubmit(values.email, values.password);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          handleBlur,
          touched,
          errors,
        }) => (
          <>
            <View className="my-2 w-full rounded-md border border-white px-2 py-1">
              <InputField
                placeholder="Email"
                handleChange={handleChange("email")}
                value={values.email}
                keyboardType="email-address"
                handleBlur={handleBlur("email")}
              />
              {touched.email && errors.email && (
                <Text className="text-white">{errors.email}</Text>
              )}
            </View>
            <View className="my-2 w-full rounded-md border border-white px-2 py-1">
              <InputField
                placeholder="Password"
                handleChange={handleChange("password")}
                value={values.password}
                secureText
              />
              {touched.password && errors.password && (
                <Text className="text-white">{errors.password}</Text>
              )}
            </View>
            <TouchableOpacity
              className="self-end rounded-md bg-aquaBlue px-5 py-2"
              onPress={handleSubmit}
            >
              <Text className="font-roboto capitalize text-white">login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default AuthLogin;
