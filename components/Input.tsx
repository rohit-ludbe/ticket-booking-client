import { ShortcutProps, defaultShortcuts } from "@/styles/shortcuts";
import { TextInput, TextInputProps } from "react-native";

interface InputProps extends ShortcutProps, TextInputProps { }

export function Input(props: InputProps) {
  return (
    <TextInput
      style={[defaultShortcuts(props), {
        fontSize: 16,
        borderRadius: 5,
        backgroundColor: "lightgray",
        color: "black",
        borderColor: "lightgray",
        borderWidth: 1,
        fontFamily: "inter",
      }]}
      {...props}
    />
  );
}
