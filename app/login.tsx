import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { VStack } from "@/components/VStack";
import { HStack } from "@/components/HStack";
import { Text } from "@/components/Text";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { useAuth } from "@/context/AuthContext";
import Hello from "@/assets/Hello";
import Twitter from "@/assets/Twitter";
import Facebook from "@/assets/Facebook";

const LoginScreen = () => {
  const { authenticate, isLoadingAuth } = useAuth();

  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ontoggleAuthMode = () => {
    setAuthMode((auth) => (auth == "login" ? "register" : "login"));
  };

  async function onAuthenticate() {
    await authenticate(authMode, email, password, name);
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <VStack flex={1} justifyContent="center" py={40} px={25} gap={30}>
          <HStack
            gap={10}
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View
              style={{
                padding: 5,
                borderRadius: 10,
                backgroundColor: "#328e6e",
                height: 35,
              }}
            >
              <Hello />
            </View>
            <Text
              fontSize={20}
              style={{
                fontWeight: "600",
                width: "auto",
                flex: 1,
              }}
            >
              Socialize
            </Text>
          </HStack>

          <VStack gap={8}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              Log in to your Account
            </Text>
            <Text
              style={{
                fontSize: 14,
              }}
            >
              Welcome back! Select method to log in:
            </Text>
          </VStack>

          <HStack
            style={{
              gap: 10,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                borderStyle: "solid",
                justifyContent: "center",
                borderWidth: 1,
                alignItems: "center",
                paddingVertical: 8,
                borderRadius: 5,
                flexDirection: "row",
                gap: 5,
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                }}
              >
                Twitter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                borderStyle: "solid",
                justifyContent: "center",
                borderWidth: 1,
                alignItems: "center",
                paddingVertical: 8,
                borderRadius: 5,
                flexDirection: "row",
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                }}
              >
                Facebook
              </Text>
            </TouchableOpacity>
          </HStack>

          <VStack w={"100%"} gap={20}>
            <VStack>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                or continue with email
              </Text>
            </VStack>
            <VStack gap={10}>
              {authMode !== "login" && (
                <VStack gap={5}>
                  <Input
                    value={name}
                    onChangeText={setName}
                    placeholder="Name"
                    placeholderTextColor={"darkgray"}
                    autoCapitalize="none"
                    autoCorrect={false}
                    h={48}
                    p={14}
                  />
                </VStack>
              )}
              <VStack gap={5}>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  placeholderTextColor={"darkgray"}
                  autoCapitalize="none"
                  autoCorrect={false}
                  h={48}
                  p={14}
                />
              </VStack>
              <VStack gap={5}>
                <Input
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor={"darkgray"}
                  autoCapitalize="none"
                  autoCorrect={false}
                  h={48}
                  p={14}
                  secureTextEntry
                />
              </VStack>
            </VStack>
            <HStack
              style={{
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#328e6e",
                    fontWeight: "800",
                  }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </HStack>

            <Button disabled={isLoadingAuth} onPress={onAuthenticate}>
              {authMode === "login" ? "Log in" : "Register"}
            </Button>
          </VStack>
          <HStack
            style={{
              justifyContent: "center",
            }}
            gap={5}
          >
            <Text fontSize={14}>
              {authMode === "login"
                ? "Don't have an account ?"
                : "Already have an account ?"}
            </Text>

            <Text
              onPress={ontoggleAuthMode}
              fontSize={14}
              style={{
                color: "#328e6e",
                fontWeight: "800",
              }}
            >
              {authMode === "login" ? "Create an account" : "Click here"}
            </Text>
          </HStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
