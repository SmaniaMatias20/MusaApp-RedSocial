export interface User {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    birthDate: Date | string;
    description?: string;
    profileImage?: string;
    isAdmin: boolean;
    accessToken: string;
}