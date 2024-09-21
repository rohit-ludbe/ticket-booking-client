import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const EventsLayout = () => {
  return (
    <Stack screenOptions={{ headerBackTitle: "Events" }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='new' />
      <Stack.Screen name='event/[id]' />
    </Stack>
  )
}

export default EventsLayout

const styles = StyleSheet.create({})
