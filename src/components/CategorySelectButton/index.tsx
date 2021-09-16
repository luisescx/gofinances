import React from "react";
import { Container, Title, Icon } from "./styles";

interface Props {
    title: string;

    onPress: () => void;
}

const CategorySelectButton = ({ title, onPress }: Props) => {
    return (
        <Container onPress={onPress}>
            <Title>{title}</Title>
            <Icon name="chevron-down" />
        </Container>
    );
};

export default CategorySelectButton;
