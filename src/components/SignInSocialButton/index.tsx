import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { SvgProps } from "react-native-svg";

import { Button, ImageContainer, Title } from "./styles";

interface ButtonProps extends RectButtonProps {
    title: string;
    svg: React.FC<SvgProps>;
}

const SignInSocialButton = ({ title, svg: SVG, ...rest }: ButtonProps) => {
    return (
        <Button {...rest}>
            <ImageContainer>
                <SVG />
            </ImageContainer>

            <Title>{title}</Title>
        </Button>
    );
};

export default SignInSocialButton;
