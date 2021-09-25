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
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import CategorySelect from "../CategorySelect";
import InputForm from "../../components/Form/InputForm";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormData {
    name: string;

    amount: string;
}

const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    amount: yup
        .number()
        .typeError("Informe um valor númerico")
        .positive("O valor não pode ser negativo")
        .required("Preço é obrigatório"),
});

const Register = () => {
    const [transactionType, setTransactionType] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria",
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

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
        if (transactionType === "") {
            return Alert.alert("Selecione um tipo de transação");
        }

        if (category.key === "category") {
            return Alert.alert("Selecione uma categoria");
        }

        const data = {
            category: category.key,
            transactionType,
            name: form.name,
            amount: form.amount,
        };

        console.log(data);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />

                        <InputForm
                            control={control}
                            name="amount"
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
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

                    <Button
                        title="Enviar"
                        onPress={() => handleSubmit(handleRegister)}
                    />
                </Form>

                <Modal visible={showModal} transparent={true}>
                    <CategorySelect
                        closeSelectCategory={handleCloseModal}
                        category={category}
                        setCategory={setCategory}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
};

export default Register;
