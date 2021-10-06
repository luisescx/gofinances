import React from "react";
import { ThemeProvider } from "styled-components/native";
import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { StatusBar } from "react-native";
import { AuthProvider, useAuth } from "./src/hooks/auth";
import Routes from "./src/routes";

import theme from "./src/global/styles/theme";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import "react-native-gesture-handler";

export default function App() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold,
    });

    const { userStorageLoading } = useAuth();

    if (!fontsLoaded && userStorageLoading) {
        return <AppLoading />;
    }

    return (
        <>
            <StatusBar
                barStyle="light-content"
                translucent={true}
                backgroundColor={theme.colors.primary}
            />

            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <Routes />
                </AuthProvider>
            </ThemeProvider>
        </>
    );
}
