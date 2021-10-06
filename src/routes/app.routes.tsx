import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import Dashboard from "../screens/Dashboard";
import Register from "../screens/Register";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { RootParamList } from "../common/interfaces";
import Resume from "../screens/Resume";

const { Navigator, Screen } = createBottomTabNavigator<RootParamList>();

const AppRoutes = () => {
    const theme = useTheme();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.secondary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: "beside-icon",
                tabBarStyle: {
                    paddingVertical: Platform.OS === "ios" ? 20 : 0,
                    height: 72,
                },
            }}
        >
            <Screen
                name="Listagem"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons
                            name="format-list-bulleted"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Screen
                name="Cadastrar"
                component={Register}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons
                            name="attach-money"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Screen
                name="Resumo"
                component={Resume}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons
                            name="pie-chart"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Navigator>
    );
};

export default AppRoutes;
