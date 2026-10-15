import { router } from "expo-router";
import { Button, Text, View } from "react-native";

const SignUp = () => {
  return (
    <View>
      <Text>SignUp</Text>
      <Button title="Log In" onPress={() => router.push("/(auth)/log-in")} />
    </View>
  );
};

export default SignUp;
