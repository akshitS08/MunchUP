import { BlurView } from "expo-blur";
import { Text, View } from "react-native";

interface CustomToastProps {
  text1?: string;
}

const CustomToast = ({ text1 }: CustomToastProps) => {
  return (
    <View className="self-center w-[40%] overflow-hidden rounded-full">
      <BlurView
        intensity={70}
        tint="dark"
        className="bg-dark-100 px-6 py-4 items-center jsutify-center"
      >
        <Text className="text-white font-quicksand-medium text-base text-center">
          {text1}
        </Text>
      </BlurView>
    </View>
  );
};

export default CustomToast;
