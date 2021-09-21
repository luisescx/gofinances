import React, { useState } from "react";

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
import { Modal } from "react-native";
import CategorySelect from "../CategorySelect";
import InputForm from "../../components/Form/InputForm";
import { useForm } from "react-hook-form";

interface FormData {
    name: string;

    amount: string;
}

const Register = () => {
    const [transactionType, setTransactionType] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria",
    });

    const { control, handleSubmit } = useForm();

    const handleTransactionType = (type: "up" | "down") => {
        setTransactionType(type);
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleRegister = (form: FormData) => {
        const data = {
            category: category.key,
            transactionType,
            name: form.name,
            amount: form.amount,
        };

        console.log(data);
    };

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <InputForm
                        control={control}
                        name="name"
                        placeholder="Nome"
                    />
                    <InputForm
                        control={control}
                        name="amount"
                        placeholder="Preço"
                    />

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

                    <CategorySelectButton
                        title={category.name}
                        onPress={handleOpenModal}
                    />
                </Fields>

                <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
            </Form>

            <Modal visible={showModal} transparent={true}>
                <CategorySelect
                    closeSelectCategory={handleCloseModal}
                    category={category}
                    setCategory={setCategory}
                />
            </Modal>
        </Container>
    );
};

export default Register;
