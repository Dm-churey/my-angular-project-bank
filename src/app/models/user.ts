export interface UserInterface {
    login: string;
    email: string;
    lastName: string;
    firstName: string;
    middleName: string;
    sex: 'male' | 'female' | null;
    birthdate: string;
    phoneNumber: string;
    address: string;
    isMustChangePassword: boolean;
}