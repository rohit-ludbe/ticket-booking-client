import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { VStack } from '@/components/VStack'
import { HStack } from '@/components/HStack'
import { Text } from '@/components/Text'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
import { useAuth } from '@/context/AuthContext'

const LoginScreen = () => {

  const { authenticate, isLoadingAuth } = useAuth()

  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("rohit20@gmail.com")
  const [password, setPassword] = useState("123456")

  const ontoggleAuthMode = () => {
    setAuthMode((auth) => auth == "login" ? "register" : "login")
  }

  async function onAuthenticate() {
    await authenticate(authMode, email, password)
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <VStack flex={1} justifyContent='center' alignItems='center' p={40} gap={40}>
          <HStack gap={10}>
            <Text fontSize={30} bold mb={20} >Ticket Booking</Text>
            <TabBarIcon name='ticket' size={50} />
          </HStack>

          <VStack w={"100%"} gap={30}>

            <VStack gap={10}>
              <VStack gap={5} >
                <Text ml={5} fontSize={14} color='gray'>Name</Text>
                <Input value={email} onChangeText={setEmail} placeholder='Email' placeholderTextColor={"darkgray"} autoCapitalize='none' autoCorrect={false} h={48} p={14} />
              </VStack>
              <VStack gap={5} >
                <Text ml={5} fontSize={14} color='gray'>Password</Text>
                <Input value={password} onChangeText={setPassword} placeholder='Password' placeholderTextColor={"darkgray"} autoCapitalize='none' autoCorrect={false} h={48} p={14} secureTextEntry />
              </VStack>
            </VStack>

            <Button
              disabled={isLoadingAuth}
              onPress={onAuthenticate}
            >
              {authMode === "login" ? "Login" : "Register"}
            </Button>
          </VStack>
          <Divider />
          <Text onPress={ontoggleAuthMode} fontSize={16} underline >
            {authMode === "login" ? "Register" : "Login"}
          </Text>
        </VStack>

      </ScrollView>
    </KeyboardAvoidingView >
  )
}

export default LoginScreen

const styles = StyleSheet.create({})
