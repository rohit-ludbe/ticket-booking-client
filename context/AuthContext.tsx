import { userService } from "@/services/user";
import { User } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  isLoggedIn: boolean
  isLoadingAuth: boolean
  authenticate: (authMode: "login" | "register", email: string, password: string) => Promise<void>;
  logout: VoidFunction,
  user: User | null
}

const AuthContext = createContext({} as AuthContextProps);

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthenticationProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoadingAuth, setIsLoadingAuth] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function checkIfLoggedIn() {
      const token = await AsyncStorage.getItem("token")
      const user = await AsyncStorage.getItem("user")
      if (token && user) {
        console.log("authed", token, user)
        setIsLoggedIn(true)
        setUser(JSON.parse(user))
        router.replace("/(authed)")
      } else {
        setIsLoggedIn(false)

      }
    }
    checkIfLoggedIn()
  }, [])

  async function authenticate(authMode: "login" | "register", email: string, password: string) {
    try {
      setIsLoadingAuth(true)
      const response = await userService[authMode]({ email, password });
      if (response) {
        const { data } = response
        const { user } = data
        await AsyncStorage.setItem("user", JSON.stringify(user))
        setUser(user)
        setIsLoggedIn(true)
        router.replace("/(authed)")
      }

    } catch (error) {
      console.log(error)
      alert("error")
      setIsLoggedIn(false)
    } finally {
      setIsLoadingAuth(false)
    }
  }

  async function logout() {
    setIsLoggedIn(false)
    await AsyncStorage.clear()
  }

  return (
    <AuthContext.Provider
      value={{
        isLoadingAuth,
        isLoggedIn,
        authenticate,
        user,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
