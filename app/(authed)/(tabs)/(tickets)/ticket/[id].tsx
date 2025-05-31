import { Image, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { Ticket } from "@/types/ticket";
import { ticketService } from "@/services/ticket";
import { VStack } from "@/components/VStack";
import { Text } from "@/components/Text";
import { HStack } from "@/components/HStack";
import dayjs from "dayjs";

const TicketDetailsScreen = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const [ticket, setTicket] = useState<Ticket | null>();
  const [qrCode, setQrcode] = useState<string | null>(null);

  const fetchTicket = async () => {
    try {
      const response = await ticketService.getOne(Number(id));
      setTicket(response.data.ticket);
      setQrcode(response.data.qrcode);
    } catch (error) {
      console.log("error", error);
      router.back();
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTicket();
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
  }, [navigation]);

  if (!ticket) return null;

  const ticketID = "";
  const EventNameInitials = ticket?.event?.title
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("");

  console.log(ticket);

  return (
    <VStack
      alignItems="center"
      justifyContent="flex-start"
      m={20}
      gap={20}
      flex={1}
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <VStack
        style={{
          backgroundColor: "#328e6e",
          width: "100%",
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        <HStack style={{ justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 14,
              color: "#ffffff",
              fontWeight: 800,
            }}
          >
            ECO EVENT
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#ffffff",
              fontWeight: 800,
            }}
          >
            ADMIT ONE
          </Text>
        </HStack>
        <HStack style={{ justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 14,
              color: "#ffffff",
              fontWeight: 800,
            }}
          >
            Ticket #{EventNameInitials}-{ticket.id}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#ffffff",
              fontWeight: 800,
            }}
          >
            General Admission
          </Text>
        </HStack>
      </VStack>
      <VStack
        style={{
          flex: 1,
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "800",
            textAlign: "center",
          }}
        >
          {ticket.event.title}
        </Text>
        <Text fontSize={16} color="gray">
          {ticket.event.organizer}
        </Text>

        <VStack
          style={{
            paddingBottom: 20,
          }}
        >
          <Image
            style={{ borderRadius: 20 }}
            width={180}
            height={180}
            source={{ uri: `data:image/png;base64,${qrCode}` }}
          />
          <Text
            style={{
              fontSize: 12,
              color: "gray",
              textAlign: "center",
            }}
          >
            Scan for check-in
          </Text>
        </VStack>
        <VStack
          style={{
            gap: 10,
          }}
        >
          <HStack
            style={{
              justifyContent: "space-between",
              width: "100%",
              paddingHorizontal: 30,
            }}
          >
            <VStack style={styles.eventCard}>
              <Text style={styles.eventTitle}>Date</Text>
              <Text style={styles.eventDescription}>{ticket?.event.date}</Text>
            </VStack>
            <VStack style={styles.eventCard}>
              <Text style={styles.eventTitle}>Time</Text>
              <Text style={styles.eventDescription}>9:00 AM : 12:00 PM</Text>
            </VStack>
          </HStack>
          <HStack
            style={{
              justifyContent: "space-between",
              width: "100%",
              paddingHorizontal: 30,
            }}
          >
            <VStack style={styles.eventCard}>
              <Text style={styles.eventTitle}>Location</Text>
              <Text style={styles.eventDescription}>
                {ticket?.event.location}
              </Text>
            </VStack>
            <VStack style={styles.eventCard}>
              <Text style={styles.eventTitle}>Group</Text>
              <Text style={styles.eventDescription}>None</Text>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
      <VStack
        style={{
          borderTopWidth: 1,
          borderStyle: "dashed",
          borderColor: "lightgray",
          width: "100%",
          padding: 20,
        }}
      >
        <HStack
          style={{
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "gray",
            }}
          >
            Volunteer ID: {EventNameInitials}-{ticketID}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "gray",
            }}
          >
            Issued: {dayjs(ticket?.createdAt)?.format("YYYY-MM-DD")}
          </Text>
        </HStack>
        <VStack
          style={{
            marginTop: 24,
          }}
        >
          <Text style={{ fontSize: 12, color: "gray", textAlign: "center" }}>
            Please arrive 15 minutes before the event starts.
          </Text>
          <Text style={{ fontSize: 12, color: "gray", textAlign: "center" }}>
            For questions: info@rohitludbe.com
          </Text>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default TicketDetailsScreen;

const styles = StyleSheet.create({
  eventCard: {
    alignItems: "flex-start",
    width: "30%",
  },
  eventTitle: {
    fontSize: 12,
    color: "gray",
  },
  eventDescription: {
    fontSize: 12,
  },
});
