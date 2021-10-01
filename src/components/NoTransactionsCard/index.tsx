import React from "react";

import { Container, Title, Content } from "./styles";

interface Props {
    msg?: string;
}

const NoTransactionsCard = ({ msg }: Props) => {
    return (
        <Container>
            <Title>Sem transações</Title>

            <Content>
                {msg
                    ? msg
                    : "Cadastra suas transações para que elas possam aparecer aqui na listagem"}
            </Content>
        </Container>
    );
};

export default NoTransactionsCard;
