import { Image, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { router, useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router'
import { Ticket } from '@/types/ticket'
import { ticketService } from '@/services/ticket'
import { VStack } from '@/components/VStack'
import { Text } from '@/components/Text'

const TicketDetailsScreen = () => {
  const navigation = useNavigation()
  const { id } = useLocalSearchParams()

  const [ticket, setTicket] = useState<Ticket | null>()
  const [qrCode, setQrcode] = useState<string | null>(null)

  const fetchTicket = async () => {
    try {
      const response = await ticketService.getOne(Number(id))
      setTicket(response.data.ticket)
      setQrcode(response.data.qrcode)

    } catch (error) {
      console.log("error", error);
      router.back()
    }
  }

  useFocusEffect(useCallback(() => {
    fetchTicket()
  }, []))

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    })
  }, [navigation])

  if (!ticket) return null

  return (
    <VStack
      alignItems="center"
      m={20}
      p={20}
      gap={20}
      flex={1}
      style={{
        backgroundColor: "white",
        borderRadius: 20
      }}
    >
      <Text fontSize={50} bold>{ticket.event.name}</Text>
      <Text fontSize={20} bold>{ticket.event.location}</Text>
      <Text fontSize={16} color="gray">{new Date(ticket.event.date).toLocaleString()}</Text>

      <Image
        style={{ borderRadius: 20 }}
        width={300}
        height={300}
        source={{ uri: `data:image/png;base64,${qrCode}` }}
      />
    </VStack>
  )
}

export default TicketDetailsScreen

const styles = StyleSheet.create({})
