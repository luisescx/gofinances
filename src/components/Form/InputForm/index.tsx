import React from "react";
import { Controller, Control, FieldValues } from "react-hook-form";
import { TextInputProps } from "react-native";
import Input from "../Input";
import { Container, Error } from "./styles";

interface Props extends TextInputProps {
    control: Control<FormValues>;

    name: string;

    error: string | undefined;
}

export interface FormValues extends FieldValues {
    name: string;

    amount: string;
}

const InputForm = ({ control, name, error, ...rest }: Props) => {
    return (
        <Container>
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Input onChangeText={onChange} value={value} {...rest} />
                )}
                name={name}
            />
            {error && <Error>{error}</Error>}
        </Container>
    );
};

export default InputForm;
