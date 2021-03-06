import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Button = styled(RectButton)`
    height: ${RFValue(56)}px;

    flex-direction: row;

    align-items: center;
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;
    margin-bottom: 16px;
`;

export const ImageContainer = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;

    padding: ${RFValue(16)}px;

    border-right-width: 1px;
    border-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
    flex: 1;
    text-align: center;
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.title};
`;
