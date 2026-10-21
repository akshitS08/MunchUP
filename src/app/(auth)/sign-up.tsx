import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const Submit = async () => {
    if (!form.name || !form.email.trim() || !form.password) {
      Alert.alert("Error", "Please enter valid name, email & password");
    }

    setIsSubmitting(true);

    try {
      //call appwrite signup function
      Toast.show({
        type: "success",
        text1: "Welcome back!",
      });

      router.replace("/");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-7 bg-white rounded-lg p-5 mt-5">
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
        <Text className="base-regular text-gray-200">
          Already have an account?
        </Text>
        <Link href="/(auth)/log-in">
          <Text className="text-primary base-bold">Log In</Text>
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
