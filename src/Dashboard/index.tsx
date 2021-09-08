import React from "react";

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionCards,
} from "./styles";
import { TouchableOpacity } from "react-native";
import HighlightCard from "../components/HighlightCard";
import TransactionCard, { Transaction } from "../components/TransactionCard";

const Dashboard = () => {
    const transactions = [
        {
            id: "1",
            type: "positive",
            title: "Desenvolvimento de site",
            amount: "R$ 12.000,00",
            category: {
                key: "salary",
                name: "Vendas",
                icon: "dollar-sign",
            },
            date: "13/04/2021",
        },
        {
            id: "2",
            type: "negative",
            title: "Hamburgueria",
            amount: "R$ 50,00",
            category: {
                key: "salary",
                name: "Alimentação",
                icon: "coffee",
            },
            date: "13/04/2021",
        },
        {
            id: "3",
            type: "negative",
            title: "Aluguel Apto",
            amount: "R$ 1.200,00",
            category: {
                key: "salary",
                name: "Casa",
                icon: "shopping-bag",
            },
            date: "13/04/2021",
        },
    ] as Transaction[];

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{ uri: "https://github.com/luisescx.png" }}
                        />

                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Luis</UserName>
                        </User>
                    </UserInfo>
                    <TouchableOpacity>
                        <Icon name="power" />
                    </TouchableOpacity>
                </UserWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard
                    type="up"
                    title={"Entradas"}
                    amount={"R$ 17.400,00"}
                    lastTransaction={"Última entrada dia 13 de abril"}
                />
                <HighlightCard
                    type="down"
                    title={"Saídas"}
                    amount={"R$ 1.259,00"}
                    lastTransaction={"Última entrada dia 13 de abril"}
                />
                <HighlightCard
                    type="total"
                    title={"Total"}
                    amount={"R$ 16.141,00"}
                    lastTransaction={"01 à 16 de abril"}
                />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionCards
                    data={transactions}
                    keyExtractor={(item) => item.id!}
                    renderItem={({ item }) => (
                        <TransactionCard transaction={item} />
                    )}
                />
            </Transactions>
        </Container>
    );
};

export default Dashboard;
