import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { router, useFocusEffect, useNavigation } from 'expo-router'
import { Ticket } from '@/types/ticket'
import { ticketService } from '@/services/ticket'
import { VStack } from '@/components/VStack'
import { HStack } from '@/components/HStack'
import { Text } from '@/components/Text'

const TicketsScreen = () => {

  const navigation = useNavigation()

  const [isLoading, setIsLoading] = useState(false)
  const [tickets, setTickets] = useState<Array<Ticket>>([])

  function onGoToTicketPage(id: number) {
    router.push(`/(tickets)/ticket/${id}`)
  }

  const fetchTickets = async () => {
    try {
      setIsLoading(true)

      const response = await ticketService.getAll();
      setTickets(response.data)

    } catch (error) {

      Alert.alert("Error", (error as Error).message)

    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchTickets()
  }, []))

  useEffect(() => {

    navigation.setOptions({
      headerTitle: "Tickets",
    })
  }, [navigation])

  return (
    <VStack flex={1} p={20} pb={0} gap={20}>
      <HStack alignItems='center' justifyContent='space-between'>
        <Text fontSize={18} bold>{tickets?.length} Tickets</Text>
      </HStack>
      <FlatList
        keyExtractor={({ id }) => id.toString()}
        data={tickets}
        onRefresh={fetchTickets}
        refreshing={isLoading}
        renderItem={({ item }) => (
          <TouchableOpacity disabled={item.entered} onPress={() => onGoToTicketPage(item.id)}>
            <VStack
              gap={20}
              h={120}
              key={item.id}
              style={{ opacity: item.entered ? 0.5 : 1 }}
            >
              <HStack>
                <VStack
                  h={120}
                  w={"69%"}
                  p={20}
                  justifyContent="space-between"
                  style={{
                    backgroundColor: "white",
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5
                  }}
                >
                  <HStack alignItems="center">
                    <Text fontSize={22} bold>{item.event.name}</Text>
                    <Text fontSize={22} bold> | </Text>
                    <Text fontSize={16} bold>{item.event.location}</Text>
                  </HStack>
                  <Text fontSize={12}>{new Date(item.event.date).toLocaleString()}</Text>
                </VStack>

                <VStack
                  h={110}
                  w={"1%"}
                  style={{
                    alignSelf: "center",
                    borderColor: "lightgray",
                    borderWidth: 2,
                    borderStyle: 'dashed',
                  }}
                />

                <VStack
                  h={120}
                  w={"29%"}
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    backgroundColor: "white",
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                  }}
                >
                  <Text fontSize={16} bold>{item.entered ? "Used" : "Available"}</Text>
                  {item.entered &&
                    <Text mt={12} fontSize={10}>{new Date(item.updatedAt).toLocaleString()}</Text>
                  }
                </VStack>
              </HStack>

            </VStack>
          </TouchableOpacity>
        )}

      />

    </VStack>
  )
}

export default TicketsScreen

const styles = StyleSheet.create({})
