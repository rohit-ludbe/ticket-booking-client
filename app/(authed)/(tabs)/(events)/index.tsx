import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { eventService } from '@/services/event'
import { Event } from '@/types/event'
import { VStack } from '@/components/VStack'
import { HStack } from '@/components/HStack'
import { Text } from '@/components/Text'

import { Button } from '@/components/Button'
import { router, useFocusEffect, useNavigation } from 'expo-router'
import { useAuth } from '@/context/AuthContext'
import { UserRole } from '@/types/user'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Divider } from '@/components/Divider'
import { ticketService } from '@/services/ticket'

const EventScreen = () => {

  const { user } = useAuth()
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [events, setEvents] = useState<Array<Event>>([])

  const fetchEvents = async () => {
    try {
      setIsLoading(true)

      const response = await eventService.getAll();
      setEvents(response.data)
      console.log(response, "new data")

    } catch (error) {

      Alert.alert("Error", (error as Error).message)

    } finally {
      setIsLoading(false)
    }
  }

  const redirectToEvent = (id: number) => {

    if (user?.role === UserRole.Manager) {
      router.push(`/(events)/event/${id}`)
    }

  }

  const buyTicket = async (id: number) => {
    try {
      await ticketService.createOne(id)
      Alert.alert("Success", "Ticket Purchased Successfully")
    } catch (error) {
      Alert.alert("Error", "Failed to buy ticket")
      console.log(error)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchEvents()
  }, []))


  useEffect(() => {

    navigation.setOptions({
      headerTitle: "Events",
      headerRight: user?.role === UserRole.Manager ? HeaderRight : null
    })
  }, [fetchEvents, user])

  return (
    <VStack flex={1} p={20} pb={0} gap={20}>

      <HStack alignItems='center' justifyContent='center'>
        <Text fontSize={18} bold>{events?.length} Events</Text>
      </HStack>

      <FlatList
        data={events}
        keyExtractor={({ id }) => id.toString()}
        onRefresh={fetchEvents}
        refreshing={isLoading}
        ItemSeparatorComponent={() => <VStack h={20} />}
        renderItem={({ item }) => (
          <VStack gap={20} p={20} style={{
            backgroundColor: "white",
            borderRadius: 20
          }}
            key={item.id}
          >
            <TouchableOpacity onPress={() => {
              redirectToEvent(item.id)
            }}>
              <HStack alignItems='center' justifyContent='space-between'>
                <HStack alignItems='center'>
                  <Text fontSize={26} bold>{item.name}</Text>
                  <Text fontSize={26} bold> | </Text>
                  <Text fontSize={16} bold>{item.location}</Text>
                </HStack>
                {
                  user?.role === UserRole.Manager && <TabBarIcon size={24} name='chevron-forward' />
                }
              </HStack>
            </TouchableOpacity>

            <Divider />

            <HStack justifyContent='space-between' >
              <Text bold fontSize={16} color='gray'>Sold: {item.totalTicketPurchased}</Text>
              <Text bold fontSize={16} color='green'>Entered: {item.totalTicketEntered}</Text>
            </HStack>

            {
              user?.role === UserRole.Attendee &&
              <VStack>
                <Button variant='outlined' onPress={() => buyTicket(item.id)}>
                  Buy Ticket
                </Button>
              </VStack>
            }

            <Text fontSize={13} color='gray'>
              {item.date}
            </Text>
          </VStack>
        )}
      />

    </VStack>
  )
}

export default EventScreen

const styles = StyleSheet.create({})


const HeaderRight = () => {
  return <TabBarIcon size={32} name='add-circle-outline' onPress={() => router.push("/(events)/new")} />
}
