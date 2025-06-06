import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { Button } from "./Button";
import { Text } from "./Text";
import { HStack } from "./HStack";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

interface DateTimePickerProps {
  onChange: (date: Date) => void;
  currentDate: Date;
}

export default function DateTimePicker(props: DateTimePickerProps) {
  if (Platform.OS === "android") {
    return <AndroidDateTimePicker {...props} />;
  }

  if (Platform.OS === "ios") {
    return <IOSDateTimePicker {...props} />;
  }

  return null;
}

export const AndroidDateTimePicker = ({
  onChange,
  currentDate,
}: DateTimePickerProps) => {
  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: currentDate,
      onChange: (_, date?: Date) => onChange(date || new Date()),
      mode: "date",
    });
  };

  return (
    <TouchableOpacity onPress={showDatepicker}>
      <HStack p={10} alignItems="center" justifyContent="space-between">
        <Text>{currentDate?.toLocaleDateString()}</Text>
      </HStack>
    </TouchableOpacity>
  );
};

export const IOSDateTimePicker = ({
  onChange,
  currentDate,
}: DateTimePickerProps) => {
  return (
    <RNDateTimePicker
      style={{ alignSelf: "flex-start" }}
      accentColor="black"
      minimumDate={new Date()}
      value={currentDate}
      mode={"date"}
      display="default"
      onChange={(_, date) => onChange(date || new Date())}
    />
  );
};
