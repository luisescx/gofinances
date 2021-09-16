import React from "react";
import { Container, Title, Icon } from "./styles";

interface Props {
    title: string;
}

const CategorySelectButton = ({ title }: Props) => {
    return (
        <Container>
            <Title>{title}</Title>
            <Icon name="chevron-down" />
        </Container>
    );
};

export default CategorySelectButton;
