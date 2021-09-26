import { TransactionType } from "./enums";

export interface Transaction {
    // id?: string;
    type: TransactionType;
    amount: number;
    name: string;
    category: {
        key: string;
        name: string;
    };
    // date: string;
}
