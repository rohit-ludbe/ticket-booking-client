import {
  Alert,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { eventService } from "@/services/event";
import { Event } from "@/types/event";
import { VStack } from "@/components/VStack";
import { HStack } from "@/components/HStack";
import { Text } from "@/components/Text";

import { Button } from "@/components/Button";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/user";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Divider } from "@/components/Divider";
import { ticketService } from "@/services/ticket";
import { Input } from "@/components/Input";
import EventBackground from "@/assets/EventBackground";
import { useFilteredEvents } from "@/app/hooks/useFilteredEvents";

const EventScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Array<Event>>([]);
  const [search, setSearch] = useState("");
  console.log(user, "user");

  const fetchEvents = async () => {
    try {
      setIsLoading(true);

      const response = await eventService.getAll();
      setEvents(response.data);
      console.log(response, "new data");
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToEvent = (id: number) => {
    if (user?.role === UserRole.Manager) {
      router.push(`/(events)/event/${id}`);
    }
  };

  const buyTicket = async (id: number) => {
    try {
      await ticketService.createOne(id);
      Alert.alert("Success", "Ticket Purchased Successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to buy ticket");
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [])
  );

  const filteredEvents = useFilteredEvents(events, { search });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Events",
      headerRight: user?.role === UserRole.Manager ? HeaderRight : null,
    });
  }, [fetchEvents, user]);

  return (
    <ScrollView>
      <VStack
        flex={1}
        p={15}
        gap={20}
        style={{
          backgroundColor: "#fff",
        }}
      >
        <VStack gap={4}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            Welcome back, Rohit!
          </Text>
          <Text
            style={{
              fontSize: 14,
            }}
          >
            You have 3 upcoming events this week
          </Text>
        </VStack>
        <VStack
          style={{
            width: "100%",
          }}
        >
          <Input
            value={search}
            onChangeText={setSearch}
            placeholder="Search"
            placeholderTextColor={"darkgray"}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        </VStack>

        <HStack alignItems="center">
          <Text fontSize={18} bold>
            Top Picks: Events You Can't Miss
          </Text>
        </HStack>
        <VStack
          style={{
            gap: 10,
          }}
        >
          {filteredEvents &&
            filteredEvents.map((item) => (
              <VStack
                gap={20}
                style={{
                  borderWidth: 1,
                  borderColor: "lightgray",
                  borderRadius: 5,
                  overflow: "hidden",
                }}
                key={item.id}
              >
                <VStack
                  h={60}
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <EventBackground />
                  <View
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: "#ffffff",
                      borderRadius: 15,
                      paddingHorizontal: 12,
                      paddingVertical: 5,
                      marginLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#328e6e",
                        fontWeight: "800",
                      }}
                    >
                      {item.category}
                    </Text>
                  </View>
                </VStack>
                <VStack
                  style={{
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                  }}
                >
                  <VStack>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "700",
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                      }}
                    >
                      {item.organizer}
                    </Text>
                  </VStack>

                  <VStack
                    style={{
                      paddingVertical: 10,
                    }}
                  >
                    <HStack
                      style={{
                        justifyContent: "space-between",
                        paddingHorizontal: 20,
                      }}
                    >
                      <View>
                        <Text style={{ fontSize: 14 }}>{item.date}</Text>
                      </View>
                      <View>
                        <Text style={{ fontSize: 14 }}>{item.date}</Text>
                      </View>
                    </HStack>
                    <HStack
                      style={{
                        justifyContent: "space-between",
                        paddingHorizontal: 20,
                      }}
                    >
                      <View>
                        <Text style={{ fontSize: 14 }}>{item.location}</Text>
                      </View>
                      <View>
                        <Text style={{ fontSize: 14 }}>
                          {item.totalTicketPurchased} attending
                        </Text>
                      </View>
                    </HStack>
                  </VStack>

                  {user?.role === UserRole.Attendee ? (
                    <VStack>
                      <Button
                        variant="outlined"
                        onPress={() => buyTicket(item.id)}
                      >
                        RSVP
                      </Button>
                    </VStack>
                  ) : (
                    <Button
                      variant="outlined"
                      onPress={() => redirectToEvent(item.id)}
                    >
                      Edit
                    </Button>
                  )}
                </VStack>
              </VStack>
            ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
};

{
  /* <TouchableOpacity
              onPress={() => {
                redirectToEvent(item.id);
              }}
            >
              <HStack alignItems="center" justifyContent="space-between">
                <HStack alignItems="center">
                  <Text fontSize={26} bold>
                    {item.name}
                  </Text>
                  <Text fontSize={26} bold>
                    {" "}
                    |{" "}
                  </Text>
                  <Text fontSize={16} bold>
                    {item.location}
                  </Text>
                </HStack>
                {user?.role === UserRole.Manager && (
                  <TabBarIcon size={24} name="chevron-forward" />
                )}
              </HStack>
            </TouchableOpacity> */
}

export default EventScreen;

const styles = StyleSheet.create({});

const HeaderRight = () => {
  return (
    <TabBarIcon
      size={32}
      name="add-circle-outline"
      onPress={() => router.push("/(events)/new")}
    />
  );
};
