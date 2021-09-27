import React from "react";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/global/styles/theme";
import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./src/routes/app.routes";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import "react-native-gesture-handler";

export default function App() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold,
    });

    if (!fontsLoaded) {
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
                <NavigationContainer>
                    <AppRoutes />
                </NavigationContainer>
            </ThemeProvider>
        </>
    );
}
