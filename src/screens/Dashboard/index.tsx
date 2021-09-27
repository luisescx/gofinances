import React, { useState, useCallback } from "react";

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
    LogoutButton,
} from "./styles";
import HighlightCard from "../../components/HighlightCard";
import TransactionCard from "../../components/TransactionCard";
import { Transaction } from "../../common/interfaces";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";

const Dashboard = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const loadTransactions = async () => {
        try {
            const response = await AsyncStorage.getItem(
                "@gofinances:transactions"
            );

            const storedTransactions: Transaction[] = response
                ? JSON.parse(response)
                : [];

            const formattedTransactions = storedTransactions.map(
                (storedTransaction: Transaction) => {
                    const amount = Number(storedTransaction.amount.toFixed(2));

                    const date = Intl.DateTimeFormat("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    }).format(new Date(storedTransaction.date));

                    return {
                        ...storedTransaction,
                        amount,
                        date,
                    };
                }
            );

            setTransactions(formattedTransactions);
        } catch (error) {
            console.log(error);
            setTransactions([]);
            Alert.alert("Não foi possível salvar");
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadTransactions();
        }, [])
    );

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={require("../../../assets/img/user-avatar.png")}
                        />

                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Luis</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton>
                        <Icon name="power" />
                    </LogoutButton>
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
