import { ClientInterface } from "./client";

export interface AccountDataInterface {
    id: number;
    number: string;
    name: string;
    balance: number;
    currency: number;
    createdDate: string;
    state: string;
    client: ClientInterface;
}