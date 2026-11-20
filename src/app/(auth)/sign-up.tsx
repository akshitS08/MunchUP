import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import { createUser } from "../../../lib/appwrite";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const Submit = async () => {
    if (isSubmitting) return;

    const { name, email, password } = form;

    if (!name.trim() || !email.trim() || !password) {
      Alert.alert("Error", "Please enter valid name, email & password");
      return;
    }

    setIsSubmitting(true);

    try {
      await createUser({
        email: email.trim(),
        password,
        name: name.trim(),
      });

      Toast.show({
        type: "success",
        text1: "Account created successfully!",
      });

      router.replace("/");
    } catch (error) {
      Alert.alert(
        "Sign Up Failed",
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-7 bg-meringue rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label="Full Name"
        keyboardType="default"
      />

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

      <CustomButton title="Sign Up" isLoading={isSubmitting} onPress={Submit} />

      <View className="flex justify-center mt-3 flex-row gap-2">
        <Text className="base-regular text-marine">
          Already have an account?
        </Text>

        <Link href="/(auth)/log-in">
          <Text className="text-clementine base-bold">Log In</Text>
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
