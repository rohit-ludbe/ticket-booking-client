import { Alert, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { router, useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router'
import { Event } from '@/types/event'
import { eventService } from '@/services/event'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { VStack } from '@/components/VStack'
import { Text } from '@/components/Text'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import DateTimePicker from '@/components/DateTimePicker'

const EventDetailScreen = () => {
  const navigation = useNavigation()
  const { id } = useLocalSearchParams()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [eventData, setEventData] = useState<Event | null>(null)

  async function onSubmit() {
    if (!eventData) return null

    try {
      setIsSubmitting(true)

      await eventService.updateOne(Number(id), eventData.name, eventData.location, eventData.date)
      router.back()
    } catch (error) {
      Alert.alert("Error", "Failed to fetch events")
    } finally {
      setIsSubmitting(false)
    }

  }

  const fetchEvent = async () => {
    try {
      const response = await eventService.getOne(Number(id))
      setEventData(response.data)
    } catch (error) {
      console.log("error", error);
      router.back()
    }
  }

  const onDelete = useCallback(async () => {
    if (!eventData) return null
    try {
      Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
        { text: "Cancel" },
        {
          text: "Delete", onPress: async () => {
            await eventService.deleteOne(Number(id))
            router.back()
          }
        }
      ])

    } catch (error) {
      Alert.alert("Error", "Failed to delete Event")
    }
  }, [eventData, id])

  useFocusEffect(useCallback(() => {
    fetchEvent()
  }, []))

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerRight: () => headerRight(onDelete)
    })
  }, [navigation, onDelete])

  function updateFields(field: keyof Event, value: string | Date) {
    setEventData(prev => ({
      ...prev!,
      [field]: value
    }))
  }

  return (
    <VStack m={20} flex={1} gap={30}>
      <VStack gap={5}>
        <Text ml={5} fontSize={14} color='gray'>Name</Text>
        <Input value={eventData?.name} onChangeText={(value) => updateFields("name", value)} placeholder='Name' placeholderTextColor="darkgray" p={14} />
      </VStack>
      <VStack gap={5}>
        <Text ml={5} fontSize={14} color='gray'>Location</Text>
        <Input value={eventData?.location} onChangeText={(value) => updateFields("location", value)} placeholder='Name' placeholderTextColor="darkgray" p={14} />
      </VStack>
      <VStack gap={5}>
        <Text ml={5} fontSize={14} color='gray'>Date</Text>
        <DateTimePicker onChange={(date) => updateFields("date", date || new Date())} currentDate={new Date(eventData?.date || new Date())} />
      </VStack>

      <Button mt="auto" isLoading={isSubmitting} disabled={isSubmitting} onPress={onSubmit}>Save</Button>
    </VStack>
  )
}

export default EventDetailScreen

const styles = StyleSheet.create({})

const headerRight = (onPress: VoidFunction) => {
  return <TabBarIcon size={30} name='trash' onPress={onPress} />
}
