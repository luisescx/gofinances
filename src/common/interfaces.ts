import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { string } from "yup/lib/locale";
import { TransactionType } from "./enums";

export interface Transaction {
    id?: string;
    type: TransactionType;
    amount: number;
    name: string;
    category: {
        key: string;
        name?: string;
    };
    date: string;
}

export interface Category {
    key: string;
    name: string;
    total: number;
    color: string;
    percent?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

export interface AuthorizationResponse {
    params: {
        access_token: string;
    };
    type: string;
}

export type RootParamList = {
    Listagem: undefined;
    Cadastrar: undefined;
    Resumo: undefined;
};

export type ProfileScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<RootParamList>,
    NativeStackNavigationProp<RootParamList>
>;

// export type ScreensToNavigateProps = NativeStackScreenProps<RootParamList>;
