export interface CardInfoInterface {
    id: number;
    name: string;
    image: string;
    shortDescription: string;
}

export interface OperationStepDetails {
    accountValue: string;
    amountValue: string;
    operationName: string;
}

export interface StartOperationRequestInterface {
    operationCode: string;
}

export interface OperationResponceInterface {
    clientId: number;
    isConfirmed: boolean;
    isFinished: boolean;
    name: string;
    operationCode: string;
    requestId: number;
    startDate: string;
    stepId: number;
    stepParams: StepParam[]  
}

export interface StepParam {
    identifier: string;
    value: string | null;
    name: string;
    requirements: Requirement;
    type: string;
    values: string[];
}

export interface Requirement {
    mask: string | null;
    max: number | null;
    min: number | null;
    required: boolean;
}
  