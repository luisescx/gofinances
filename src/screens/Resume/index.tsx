import React, { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Category, Transaction } from "../../common/interfaces";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,
    LoadContainer,
} from "./styles";
import { useFocusEffect } from "@react-navigation/core";
import { useTheme } from "styled-components";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TransactionType } from "../../common/enums";
import NoTransactionsCard from "../../components/NoTransactionsCard";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";
import { useAuth } from "../../hooks/auth";

const Resume = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<Category[]>([]);
    const theme = useTheme();

    const { user } = useAuth();

    function handleDateChange(action: "next" | "prev") {
        if (action === "next") {
            setSelectedDate(addMonths(selectedDate, 1));
        } else {
            setSelectedDate(subMonths(selectedDate, 1));
        }
    }

    const loadTransactions = async () => {
        setIsLoading(true);
        const response = await AsyncStorage.getItem(
            `@gofinances:transactions_user:${user.id}`
        );

        const storedTransactions: Transaction[] = response
            ? JSON.parse(response)
            : [];

        const totalByCategory: Category[] = [];

        if (storedTransactions.length > 0) {
            const expenses = storedTransactions.filter(
                (expensive: Transaction) =>
                    expensive.type === TransactionType.outcome &&
                    new Date(expensive.date).getMonth() ===
                        selectedDate.getMonth() &&
                    new Date(expensive.date).getFullYear() ===
                        selectedDate.getFullYear()
            );

            const expensesTotal = expenses.reduce(
                (acc, { amount }) => acc + amount,
                0
            );
            categories.forEach((category) => {
                let categorySum = 0;

                expenses.forEach((storedTransaction: Transaction) => {
                    if (storedTransaction.category.key === category.key) {
                        categorySum += storedTransaction.amount;
                    }
                });

                if (categorySum > 0) {
                    const percent = `${(
                        (categorySum / expensesTotal) *
                        100
                    ).toFixed(0)}%`;

                    totalByCategory.push({
                        key: category.key,
                        name: category.name,
                        total: categorySum,
                        color: category.color,
                        percent,
                    });
                }
            });
        }

        setTotalByCategories(totalByCategory);
        setIsLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            loadTransactions();
        }, [selectedDate])
    );

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            {isLoading ? (
                <LoadContainer>
                    <ActivityIndicator
                        color={theme.colors.primary}
                        size="large"
                    />
                </LoadContainer>
            ) : (
                <Content
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingBottom: useBottomTabBarHeight(),
                    }}
                >
                    <MonthSelect>
                        <MonthSelectButton
                            onPress={() => handleDateChange("prev")}
                        >
                            <MonthSelectIcon name="chevron-left" />
                        </MonthSelectButton>

                        <Month>
                            {format(selectedDate, "MMMM, yyyy", {
                                locale: ptBR,
                            })}
                        </Month>

                        <MonthSelectButton
                            onPress={() => handleDateChange("next")}
                        >
                            <MonthSelectIcon name="chevron-right" />
                        </MonthSelectButton>
                    </MonthSelect>

                    {totalByCategories.length > 0 && (
                        <ChartContainer>
                            <VictoryPie
                                data={totalByCategories}
                                colorScale={totalByCategories.map(
                                    ({ color }) => color
                                )}
                                x="percent"
                                y="total"
                                labelRadius={50}
                                style={{
                                    labels: {
                                        fontSize: RFValue(18),
                                        fontWeight: "bold",
                                        fill: theme.colors.shape,
                                    },
                                }}
                            />
                        </ChartContainer>
                    )}

                    {totalByCategories.length > 0 &&
                        totalByCategories.map((item) => (
                            <HistoryCard
                                key={item.key}
                                title={item.name}
                                amount={item.total.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                                color={item.color}
                            />
                        ))}

                    {totalByCategories.length === 0 && (
                        <View style={{ marginTop: 16 }}>
                            <NoTransactionsCard msg="No foram feitas transações para o mês selecionado" />
                        </View>
                    )}
                </Content>
            )}
        </Container>
    );
};

export default Resume;
