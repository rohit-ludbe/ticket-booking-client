import { StyleSheet, Text, View } from "react-native";
import React, { ComponentProps } from "react";
import { Href, Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Ionicons } from "@expo/vector-icons";
import { UserRole } from "@/types/user";
import { useAuth } from "@/context/AuthContext";

const TabLayout = () => {
  const { user } = useAuth();

  const tabs = [
    {
      showFor: [UserRole.Attendee, UserRole.Manager],
      name: "(events)",
      displayName: "Events",
      icon: "calendar-clear-outline",
      options: {
        headerShown: false,
      },
    },
    {
      showFor: [UserRole.Attendee],
      name: "(tickets)",
      displayName: "My Tickets",
      icon: "ticket-outline",
      options: {
        headerShown: false,
      },
    },
    {
      showFor: [UserRole.Manager],
      name: "scan-ticket",
      displayName: "Scan Ticket",
      icon: "scan",
      options: {
        headerShown: true,
      },
    },
    {
      showFor: [UserRole.Attendee, UserRole.Manager],
      name: "settings",
      displayName: "Settings",
      icon: "cog",
      options: {
        headerShown: true,
      },
    },
  ];

  return (
    <Tabs>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            ...tab.options,
            headerTitle: tab.displayName,
            href: tab.showFor.includes(user?.role!) ? (tab.name as Href) : null,
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "black" : "gray", fontSize: 12 }}>
                {tab.displayName}
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                style={{ fontSize: 20 }}
                name={tab.icon as ComponentProps<typeof Ionicons>["name"]}
                color={focused ? "black" : "gray"}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
