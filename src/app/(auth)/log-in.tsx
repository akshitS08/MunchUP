import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import { login } from "../../../lib/appwrite";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const Submit = async () => {
    if (isSubmitting) return;

    const { email, password } = form;

    if (!email.trim() || !password) {
      Alert.alert("Error", "Please enter valid email & password");
      return;
    }

    setIsSubmitting(true);

    try {
      await login({
        email: email.trim(),
        password,
      });

      Toast.show({
        type: "success",
        text1: "Welcome back!",
      });

      router.replace("/");
    } catch (error) {
      Alert.alert(
        "Log In Failed",
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />

      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton title="Log In" isLoading={isSubmitting} onPress={Submit} />

      <View className="flex justify-center mt-3 flex-row gap-2">
        <Text className="base-regular text-gray-200">
          Don't have an account?
        </Text>
        <Link href="/(auth)/sign-up">
          <Text className="text-primary base-bold">Sign Up</Text>
        </Link>
      </View>
    </View>
  );
};

export default Login;
