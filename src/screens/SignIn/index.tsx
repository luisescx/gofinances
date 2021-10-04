import React, { useState, useEffect, useContext } from "react";
import { Alert, Platform } from "react-native";

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

const SignIn = () => {
    const [isAndroid, setIsAndroid] = useState(false);

    const { signInWithGoogle } = useAuth();

    const handleSignInWithGoogle = async () => {
        try {
            await signInWithGoogle();
        } catch (errorMessage) {
            console.log(errorMessage);

            Alert.alert(
                "Não foi possível conectar a conta google",
                `${errorMessage}`
            );
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
                        />
                    )}
                </FooterWrapper>
            </Footer>
        </Container>
    );
};

export default SignIn;
