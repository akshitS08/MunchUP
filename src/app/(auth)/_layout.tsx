import { Slot } from "expo-router";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { images } from "../../../constants";

const _layout = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="bg-white h-full"
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="w-full relative"
          style={{ height: Dimensions.get("screen").height / 2.25 }}
        >
          <Image
            source={images.loginGraphic}
            className="size-full rounded-b-[25px]"
            resizeMode="stretch"
          />
          <Image
            source={images.logo}
            className="self-center size-48 absolute -bottom-20 z-10 "
          />
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default _layout;
