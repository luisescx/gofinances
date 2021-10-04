import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

interface Props {
    isAndroid: boolean;
}

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View<Props>`
    width: 100%;

    height: ${RFPercentage(77)}px;
    background-color: ${({ theme }) => theme.colors.primary};

    justify-content: flex-end;
    align-items: center;
`;

export const TitleWrapper = styled.View`
    align-items: center;
`;

export const Title = styled.Text`
    font-size: ${RFValue(30)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.shape};

    margin-top: ${RFValue(45)}px;

    text-align: center;
`;

export const SignInTitle = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};

    margin-top: ${RFValue(80)}px;
    margin-bottom: ${RFValue(67)}px;

    text-align: center;
`;

export const Footer = styled.View`
    width: 100%;
    height: ${RFPercentage(33)}px;
    background-color: ${({ theme }) => theme.colors.secondary};
`;

export const FooterWrapper = styled.View`
    margin-top: ${RFPercentage(-4)}px;
    padding: 0 32px;
    justify-content: space-between;
`;
