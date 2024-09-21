import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const TicketsLayout = () => {
  return (
    <Stack screenOptions={{ headerBackTitle: "Tickets" }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='ticket/[id]' />
    </Stack>
  )
}

export default TicketsLayout

const styles = StyleSheet.create({})
