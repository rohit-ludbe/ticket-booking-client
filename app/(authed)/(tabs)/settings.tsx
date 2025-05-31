import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { VStack } from "@/components/VStack";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/Button";

const SettingsScreen = () => {
  const { user, logout } = useAuth();
  return (
    <VStack
      style={{
        paddingHorizontal: 20,
        paddingVertical: 20,
        flex: 1,
      }}
    >
      <VStack style={{ flex: 1 }}>
        <VStack style={{ paddingVertical: 10 }}>
          <Text style={styles.settingsTitle}>Name</Text>
          <Text style={styles.settingsValue}>{user.name}</Text>
        </VStack>
        <VStack>
          <Text style={styles.settingsTitle}>Email</Text>
          <Text style={styles.settingsValue}>{user?.email}</Text>
        </VStack>
      </VStack>
      <VStack>
        <Button onPress={logout}>Log out</Button>
      </VStack>
    </VStack>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  settingsTitle: {
    fontSize: 14,
    fontWeight: "800",
  },
  settingsValue: {
    fontSize: 14,
  },
});
