import React from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { ShortcutProps, defaultShortcuts } from "@/styles/shortcuts";

interface ButtonProps extends ShortcutProps, TouchableOpacityProps {
  variant?: "contained" | "outlined" | "ghost";
  isLoading?: boolean;
}

export const Button = ({
  onPress,
  children,
  variant = "contained",
  isLoading,
  ...restProps
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      style={[
        defaultShortcuts(restProps),
        styles[variant].button,
        isLoading && disabled.button,
      ]}
      {...restProps}
    >
      {isLoading ? (
        <ActivityIndicator animating={isLoading} size={22} />
      ) : (
        <Text style={styles[variant].text}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = {
  contained: StyleSheet.create({
    button: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: "#328e6e",
      fontSize: 14,
    },
    text: {
      textAlign: "center",
      color: "white",
      fontSize: 14,
      fontFamily: "inter",
      fontWeight: "600",
    },
  }),
  outlined: StyleSheet.create({
    button: {
      padding: 8,
      borderRadius: 8,
      borderColor: "darkgray",
      borderWidth: 1,
    },
    text: {
      textAlign: "center",
      fontSize: 14,
      fontFamily: "inter",
      fontWeight: "600",
    },
  }),
  ghost: StyleSheet.create({
    button: {
      padding: 12,
      borderRadius: 10,
      backgroundColor: "transparent",
    },
    text: {
      textAlign: "center",
      color: "black",
      fontSize: 18,
      fontFamily: "inter",
      fontWeight: "semibold",
    },
  }),
};

const disabled = StyleSheet.create({
  button: {
    opacity: 0.5,
  },
});
