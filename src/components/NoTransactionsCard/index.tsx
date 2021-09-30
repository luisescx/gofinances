import React from "react";

import { Container, Title, Content } from "./styles";

const NoTransactionsCard = () => {
    return (
        <Container>
            <Title>Sem transações</Title>

            <Content>
                Cadastra suas transações para que elas possam aparecer aqui na
                listagem
            </Content>
        </Container>
    );
};

export default NoTransactionsCard;
