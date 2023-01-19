export type ClientModel = {
    id: string;
    profileImage: string;
    name: string;
    nickname: string;
    phone: string;
    balance: number;
    personType: 'fisica' | 'juridica';
    cpf?: string;
    rg?: string;
    rgEmissionDate?: string;
    producerRegistration?: string;
    cnpj?: string;
    stateRegistration?: string;
    birthDate: string;
    fatherName: string;
    motherName: string;
    address: ClientAddressModel;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export type ClientAddressModel = {
    city: string;
    zipCode: string;
    street: string;
    number: number;
    state: string;
    neighborhood: string;
    brook: string;
}