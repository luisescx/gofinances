import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface TypeProps {
    type: "up" | "down" | "total";
}

export const Container = styled.View<TypeProps>`
    background-color: ${({ theme, type }) =>
        type === "total" ? theme.colors.secondary : theme.colors.shape};

    width: ${RFValue(300)}px;
    border-radius: 5px;

    padding: 19px 23px;
    padding-bottom: ${RFValue(42)}px;
    margin-right: ${RFValue(16)}px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
    color: ${({ theme, type }) =>
        type === "total" ? theme.colors.shape : theme.colors.title};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)<TypeProps>`
    ${({ type }) =>
        type === "up" &&
        css`
            color: ${({ theme }) => theme.colors.success};
        `};

    ${({ type }) =>
        type === "down" &&
        css`
            color: ${({ theme }) => theme.colors.danger};
        `};

    ${({ type }) =>
        type === "total" &&
        css`
            color: ${({ theme }) => theme.colors.shape};
        `};

    font-size: ${RFValue(40)}px;
`;

export const Footer = styled.View`
    margin-top: ${RFValue(40)}px;
`;

export const Amount = styled.Text<TypeProps>`
    color: ${({ theme, type }) =>
        type === "total" ? theme.colors.shape : theme.colors.title};
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(32)}px;
`;

export const LastTransaction = styled.Text<TypeProps>`
    color: ${({ theme, type }) =>
        type === "total" ? theme.colors.shape : theme.colors.title};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;
