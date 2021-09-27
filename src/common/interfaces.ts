import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
