import React from "react";
import { TextInputProps } from "react-native";
import { Container } from "./styles";

const Input = ({ ...rest }: TextInputProps) => {
    // teste
    return <Container {...rest} />;
};

export default Input;
