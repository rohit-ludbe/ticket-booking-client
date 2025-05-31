import React, { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import { ShortcutProps, defaultShortcuts } from "@/styles/shortcuts";

interface InputProps extends ShortcutProps, TextInputProps {}

export const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  return (
    <TextInput
      ref={ref}
      style={[
        defaultShortcuts(props),
        {
          fontSize: 14,
          borderRadius: 5,
          backgroundColor: "",
          color: "black",
          borderColor: "lightgray",
          borderWidth: 1,
          fontFamily: "inter",
          paddingVertical: 10,
          paddingHorizontal: 16,
          textAlignVertical: "center",
        },
      ]}
      {...props}
    />
  );
});
