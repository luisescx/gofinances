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
            {/* <StatusBar barStyle="light-content" translucent={true} /> */}

            <ThemeProvider theme={theme}>
                {/* <Dashboard /> */}
                <Register />
            </ThemeProvider>
        </>
    );
}
