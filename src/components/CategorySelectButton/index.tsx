import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title, Icon } from "./styles";

interface Props extends RectButtonProps {
    title: string;
    onPress: () => void;
}

const CategorySelectButton = ({ title, onPress, testID }: Props) => {
    return (
        <Container onPress={onPress} testID={testID}>
            <Title>{title}</Title>
            <Icon name="chevron-down" />
        </Container>
    );
};

export default CategorySelectButton;
