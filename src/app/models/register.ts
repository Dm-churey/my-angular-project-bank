export interface RegisterInterface {
    login: string | null;
    email: string | null;
    lastName: string | null;
    firstName: string | null;
    middleName: string | null;
    sex: 'male' | 'female' | null;
    birthdate: string | null;
    phoneNumber: string | null;
    address: string | null;
    password: string | null;
}