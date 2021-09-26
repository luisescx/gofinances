import React from "react";

import {
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    TransactionDate,
} from "./styles";

interface Category {
    key: string;
    name: string;
    icon: string;
}

export interface TransactionCardProps {
    id?: string;
    type: "positive" | "negative";
    title: string;
    amount: string;
    category: Category;
    date: string;
}

interface TransactionProps {
    transaction: TransactionCardProps;
}

const TransactionCard = ({ transaction }: TransactionProps) => {
    return (
        <Container>
            <Title>{transaction.title}</Title>

            <Amount type={transaction.type}>
                {transaction.type === "positive"
                    ? transaction.amount
                    : "- " + transaction.amount}
            </Amount>

            <Footer>
                <Category>
                    <Icon name={transaction.category.icon} />
                    <CategoryName>{transaction.category.name}</CategoryName>
                </Category>

                <TransactionDate>{transaction.date}</TransactionDate>
            </Footer>
        </Container>
    );
};

export default TransactionCard;
