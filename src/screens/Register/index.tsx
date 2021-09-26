import React, { useState, useEffect } from "react";

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
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction } from "../../common/interfaces";
import { TransactionType } from "../../common/enums";

interface FormData {
    name: string;

    amount: number;
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
    const [transactionType, setTransactionType] =
        useState<TransactionType | null>();
    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria",
    });

    const dataKey = "@gofinances:transactions";

    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const unsubscribe = navigation.addListener("blur", () => {
            setTransactionType(null);

            setCategory({
                key: "category",
                name: "Categoria",
            });

            reset();
        });

        return unsubscribe;
    }, [navigation]);

    const handleTransactionType = (type: TransactionType) => {
        setTransactionType(type);
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleRegister = async (form: FormData) => {
        if (!transactionType) {
            return Alert.alert("Selecione um tipo de transação");
        }

        if (category.key === "category") {
            return Alert.alert("Selecione uma categoria");
        }

        const newTransaction: Transaction = {
            category,
            type: transactionType,
            name: form.name,
            amount: form.amount,
        };

        try {
            const transactionsData = await AsyncStorage.getItem(dataKey);

            const storagedTransactions =
                transactionsData && transactionsData.length > 0
                    ? JSON.parse(transactionsData)
                    : [];

            const transactions = [...storagedTransactions, newTransaction];

            await AsyncStorage.setItem(dataKey, JSON.stringify(transactions));
        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível salvar");
        }
    };

    useEffect(() => {
        const getData = async () => {
            const data = await AsyncStorage.getItem(dataKey);
            console.log("objeto useEffect", JSON.parse(data!));
        };

        getData();
    }, []);

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
                                onPress={() =>
                                    handleTransactionType(
                                        TransactionType.income
                                    )
                                }
                                isActive={
                                    transactionType === TransactionType.income
                                }
                            />

                            <TransactionButton
                                title="Outcome"
                                type="down"
                                onPress={() =>
                                    handleTransactionType(
                                        TransactionType.outcome
                                    )
                                }
                                isActive={
                                    transactionType === TransactionType.outcome
                                }
                            />
                        </TransactionTypes>

                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenModal}
                        />
                    </Fields>

                    <Button
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)}
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
