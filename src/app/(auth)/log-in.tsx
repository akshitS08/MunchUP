import { router } from "expo-router";
import { Button, Text, View } from "react-native";

const Login = () => {
  return (
    <View>
      <Text>Login</Text>
      <Button
        title="Sign Up"
        onPress={() => router.push("/(auth)/sign-up")}
      ></Button>
    </View>
  );
};

export default Login;
