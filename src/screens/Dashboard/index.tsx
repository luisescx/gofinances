import React, { useState, useCallback } from "react";
import { ActivityIndicator } from "react-native";
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
    LoadContainer,
} from "./styles";
import HighlightCard from "../../components/HighlightCard";
import TransactionCard from "../../components/TransactionCard";
import { Transaction } from "../../common/interfaces";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";
import { TransactionType } from "../../common/enums";
import { useTheme } from "styled-components";
import NoTransactionsCard from "../../components/NoTransactionsCard";
import { useAuth } from "../../hooks/auth";

interface HighlightCardProps {
    entries: HighlightTypes;
    expenses: HighlightTypes;
    total: HighlightTypes;
}

interface HighlightTypes {
    value: string;
    dateFormatted: string;
}

const formatValues = (value: number): string => {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
};

const getLastTransactionDate = (
    transactions: Transaction[],
    transactionType?: TransactionType
) => {
    let lastTransaction: number[];

    if (transactionType) {
        lastTransaction = transactions
            .filter(({ type }: Transaction) => type === transactionType)
            .map(({ date }: Transaction) => new Date(date).getTime());

        let transactionTypeMsg = TransactionType.income ? "entrada" : "saída";

        if (lastTransaction.length > 0) {
            const lastTransactionDate = new Date(
                Math.max.apply(Math, lastTransaction)
            );

            return `Última ${transactionTypeMsg} dia  ${lastTransactionDate.getDate()} de ${lastTransactionDate.toLocaleString(
                "pt-BR",
                { month: "long" }
            )}`;
        }

        return `Sem ${transactionTypeMsg}s cadastradas`;
    } else {
        lastTransaction = transactions.map(({ date }: Transaction) =>
            new Date(date).getTime()
        );

        if (lastTransaction.length > 0) {
            const lastTransactionDate = new Date(
                Math.max.apply(Math, lastTransaction)
            );

            return `01 à ${lastTransactionDate.getDate()} de ${lastTransactionDate.toLocaleString(
                "pt-BR",
                { month: "long" }
            )}`;
        }

        return `Sem transações cadastradas`;
    }
};

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [highlightCard, sethighlightCard] = useState<HighlightCardProps>({
        entries: {
            value: formatValues(0),
            dateFormatted: "Sem entradas cadastradas",
        },
        expenses: {
            value: formatValues(0),
            dateFormatted: "Sem saídas cadastradas",
        },
        total: { value: formatValues(0), dateFormatted: "Sem Total" },
    });

    const theme = useTheme();
    const { signOut, user } = useAuth();

    const loadTransactions = async () => {
        try {
            const response = await AsyncStorage.getItem(
                `@gofinances:transactions_user:${user.id}`
            );

            const storedTransactions: Transaction[] = response
                ? JSON.parse(response)
                : [];

            let entries = 0;
            let expenses = 0;

            if (storedTransactions.length > 0) {
                const formattedTransactions = storedTransactions.map(
                    (storedTransaction: Transaction) => {
                        const amount = Number(
                            storedTransaction.amount.toFixed(2)
                        );

                        if (storedTransaction.type === TransactionType.income) {
                            entries += storedTransaction.amount;
                        } else {
                            expenses += storedTransaction.amount;
                        }

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

                sethighlightCard({
                    entries: {
                        value: formatValues(entries),
                        dateFormatted: `${getLastTransactionDate(
                            storedTransactions,
                            TransactionType.income
                        )}`,
                    },
                    expenses: {
                        value: formatValues(expenses),
                        dateFormatted: `${getLastTransactionDate(
                            storedTransactions,
                            TransactionType.outcome
                        )}`,
                    },
                    total: {
                        value: formatValues(entries - expenses),
                        dateFormatted: `${getLastTransactionDate(
                            storedTransactions
                        )}`,
                    },
                });

                setTransactions(formattedTransactions);
            }
        } catch (error) {
            console.log(error);
            setTransactions([]);
            Alert.alert("Não foi possível buscar as transações");
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadTransactions();
        }, [])
    );

    return (
        <Container>
            {isLoading ? (
                <LoadContainer>
                    <ActivityIndicator
                        color={theme.colors.primary}
                        size="large"
                    />
                </LoadContainer>
            ) : (
                <>
                    <Header>
                        <UserWrapper>
                            <UserInfo>
                                <Photo source={{ uri: user.photo }} />

                                <User>
                                    <UserGreeting>Olá,</UserGreeting>
                                    <UserName>{user.name}</UserName>
                                </User>
                            </UserInfo>
                            <LogoutButton onPress={signOut}>
                                <Icon name="power" />
                            </LogoutButton>
                        </UserWrapper>
                    </Header>

                    <HighlightCards>
                        <HighlightCard
                            type="up"
                            title={"Entradas"}
                            amount={highlightCard.entries.value}
                            lastTransaction={
                                highlightCard.entries.dateFormatted
                            }
                        />
                        <HighlightCard
                            type="down"
                            title={"Saídas"}
                            amount={highlightCard.expenses.value}
                            lastTransaction={
                                highlightCard.expenses.dateFormatted
                            }
                        />
                        <HighlightCard
                            type="total"
                            title={"Total"}
                            amount={highlightCard.total.value}
                            lastTransaction={highlightCard.total.dateFormatted}
                        />
                    </HighlightCards>

                    <Transactions>
                        <Title>Listagem</Title>

                        {transactions.length > 0 ? (
                            <TransactionCards
                                data={transactions}
                                keyExtractor={(item) => item.id!}
                                renderItem={({ item }) => (
                                    <TransactionCard transaction={item} />
                                )}
                            />
                        ) : (
                            <NoTransactionsCard />
                        )}
                    </Transactions>
                </>
            )}
        </Container>
    );
};

export default Dashboard;
