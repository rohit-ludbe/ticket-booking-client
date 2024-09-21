import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@/context/AuthContext'

const AppLayout = () => {

  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <Redirect href={"/login"} />
  }

  return (
    <Stack screenOptions={{
      headerShown: false
    }} />
  )
}

export default AppLayout

const styles = StyleSheet.create({})
