import React from "react";
import { TransactionType } from "../../common/enums";
import { Transaction } from "../../common/interfaces";
import { categories } from "../../utils/categories";

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

interface TransactionProps {
    transaction: Transaction;
}

const TransactionCard = ({ transaction }: TransactionProps) => {
    const category = categories.find(
        ({ key }) => key === transaction.category.key
    );

    const formattedAmount = Number(transaction.amount).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return (
        <Container>
            <Title>{transaction.name}</Title>

            <Amount type={transaction.type}>
                {transaction.type === TransactionType.income
                    ? formattedAmount
                    : "- " + formattedAmount}
            </Amount>

            <Footer>
                <Category>
                    <Icon name={category?.icon} />
                    <CategoryName>{category?.name}</CategoryName>
                </Category>

                <TransactionDate>{transaction.date}</TransactionDate>
            </Footer>
        </Container>
    );
};

export default TransactionCard;
