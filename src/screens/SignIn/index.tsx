import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper,
} from "./styles";

import LogoSvg from "../../assets/svg/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import SignInSocialButton from "../../components/SignInSocialButton";
import GoogleSvg from "../../assets/svg/google.svg";
import AppleSvg from "../../assets/svg/apple.svg";
import { useAuth } from "../../hooks/auth";
import { useTheme } from "styled-components";

const SignIn = () => {
    const [isAndroid, setIsAndroid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const theme = useTheme();
    const { signInWithGoogle, signInWithApple } = useAuth();

    const handleSignInWithGoogle = async () => {
        try {
            setIsLoading(true);

            return signInWithGoogle();
        } catch (errorMessage) {
            console.log(errorMessage);

            Alert.alert(
                "Não foi possível conectar a conta google",
                `${errorMessage}`
            );

            setIsLoading(false);
        }
    };

    const handleSignInWithApple = async () => {
        try {
            setIsLoading(true);

            return signInWithApple();
        } catch (errorMessage) {
            console.log(errorMessage);

            Alert.alert(
                "Não foi possível conectar a conta apple",
                `${errorMessage}`
            );

            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (Platform.OS === "android") {
            setIsAndroid(true);
        }
    }, []);

    return (
        <Container>
            <Header isAndroid={isAndroid}>
                <TitleWrapper>
                    <LogoSvg width={RFValue(120)} height={RFValue(68)} />

                    <Title>
                        Controle suas {"\n"}
                        finanças de forma {"\n"}
                        muito simples
                    </Title>
                </TitleWrapper>

                {isAndroid ? (
                    <SignInTitle>
                        Faça seu login com {"\n"}a conta abaixo
                    </SignInTitle>
                ) : (
                    <SignInTitle>
                        Faça seu login com {"\n"}
                        uma das contas abaixo
                    </SignInTitle>
                )}
            </Header>

            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />

                    {!isAndroid && (
                        <SignInSocialButton
                            title="Entrar com Apple"
                            svg={AppleSvg}
                            onPress={handleSignInWithApple}
                        />
                    )}
                </FooterWrapper>

                {isLoading && (
                    <ActivityIndicator
                        style={{ marginTop: 18 }}
                        color={theme.colors.primary}
                        size="large"
                    />
                )}
            </Footer>
        </Container>
    );
};

export default SignIn;
