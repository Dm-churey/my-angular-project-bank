import { AccountDataInterface } from "./account";
import { ClientInterface } from "./client";
import { CardInfoInterface } from "./operation";

export interface CardDataInterface {
    id: number;
    account: AccountDataInterface;
    client: ClientInterface;
    product: CardInfoInterface;
    number: string;
    month: string;
    year: string;
    cardProgram: string;
    pinRequired: boolean;
    state: string;
}

export interface PinCodeInterface {
    pinCode: number;
}