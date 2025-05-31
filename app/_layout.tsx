import { Slot } from "expo-router";
import "react-native-reanimated";

import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { AuthenticationProvider } from "@/context/AuthContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  const [loaded, error] = useFonts({
    inter: require("@/assets/fonts/Geist[wght].ttf"),
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <AuthenticationProvider>
        <Slot />
      </AuthenticationProvider>
    </>
  );
}
