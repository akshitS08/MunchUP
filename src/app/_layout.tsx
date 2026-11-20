import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import CustomToast from "../../components/CustomToast";
import "./globals.css";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Quicksand-Bold": require("../../assets/fonts/Quicksand-Bold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />

      <Toast
        position="bottom"
        bottomOffset={55}
        visibilityTime={2500}
        config={{
          success: (props) => <CustomToast {...props} />,
          error: (props) => <CustomToast {...props} />,
          info: (props) => <CustomToast {...props} />,
        }}
      />
    </>
  );
}
