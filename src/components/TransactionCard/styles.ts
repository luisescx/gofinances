import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";

interface TransactionType {
    type: "positive" | "negative";
}

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.shape};

    border-radius: 5px;

    padding: 17px 24px;
    margin-top: ${RFValue(16)}px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Amount = styled.Text<TransactionType>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
    color: ${({ theme, type }) =>
        type === "positive" ? theme.colors.success : theme.colors.danger};
`;

export const Footer = styled.View`
    margin-top: ${RFValue(19)}px;
    flex-direction: row;
    justify-content: space-between;
`;

export const Category = styled.View`
    flex-direction: row;
`;

export const Icon = styled(Feather)`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(20)}px;
`;

export const CategoryName = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(14)}px;
    margin-left: 16px;
`;

export const TransactionDate = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(14)}px;
`;
