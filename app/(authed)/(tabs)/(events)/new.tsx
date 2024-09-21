import { Alert, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { eventService } from '@/services/event'
import { router, useNavigation } from 'expo-router'
import { VStack } from '@/components/VStack'
import { Text } from '@/components/Text'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import DateTimePicker from '@/components/DateTimePicker'

const NewEvent = () => {
  const navigation = useNavigation()
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)

  function changeDate(date: Date) {
    setDate(date || new Date())
  }

  async function onSubmit() {
    try {
      setIsSubmitting(true)

      setIsSubmitting(false)
      await eventService.createOne(name, location, date.toISOString())
      router.back();

    } catch (error) {
      Alert.alert("Error", "Failed to Create Event")

    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "New Event"
    })
  }, [])

  return (
    <VStack m={20} flex={1} gap={30}>
      <VStack gap={5}>
        <Text ml={5} fontSize={14} color='gray'>Name</Text>
        <Input value={name} onChangeText={setName} placeholder='Name' placeholderTextColor="darkgray" p={14} />
      </VStack>
      <VStack gap={5}>
        <Text ml={5} fontSize={14} color='gray'>Location</Text>
        <Input value={location} onChangeText={setLocation} placeholder='Name' placeholderTextColor="darkgray" p={14} />
      </VStack>
      <VStack gap={5}>
        <Text ml={5} fontSize={14} color='gray'>Date</Text>
        <DateTimePicker currentDate={date} onChange={(date) => changeDate(date)} />
      </VStack>

      <Button mt="auto" isLoading={isSubmitting} disabled={isSubmitting} onPress={onSubmit}>Save</Button>
    </VStack>
  )
}

export default NewEvent

const styles = StyleSheet.create({})
