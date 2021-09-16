import React from "react";
import { ThemeProvider } from "styled-components/native";
import Dashboard from "./src/screens/Dashboard";
import theme from "./src/global/styles/theme";
import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import Register from "./src/screens/Register";
import CategorySelect from "./src/screens/Register/CategorySelect";
import { StatusBar } from "react-native";

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
                {/* <Dashboard /> */}
                {/* <Register /> */}
                <CategorySelect />
            </ThemeProvider>
        </>
    );
}
