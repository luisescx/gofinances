import React, { useState } from "react";
import Input from "../../components/Form/Input";
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,
} from "./styles";
import { Button } from "../../components/Form/Button";
import TransactionButton from "../../components/Form/TransactionButton";
import CategorySelectButton from "../../components/CategorySelectButton";

const Register = () => {
    const [transactionType, setTransactionType] = useState("");

    const handleTransactionType = (type: "up" | "down") => {
        setTransactionType(type);
    };

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input placeholder="Nome" />
                    <Input placeholder="Preço" />

                    <TransactionTypes>
                        <TransactionButton
                            title="Income"
                            type="up"
                            onPress={() => handleTransactionType("up")}
                            isActive={transactionType === "up"}
                        />
                        <TransactionButton
                            title="Outcome"
                            type="down"
                            onPress={() => handleTransactionType("down")}
                            isActive={transactionType === "down"}
                        />
                    </TransactionTypes>

                    <CategorySelectButton title="Categorias" />
                </Fields>

                <Button title="Enviar" />
            </Form>
        </Container>
    );
};

export default Register;
