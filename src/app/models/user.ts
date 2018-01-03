export interface User {
    email: string;
    password: string;
    admin?: boolean;
}

export interface AuthResponse {
    authResponse: FbUser;
    status: string;
}

export interface FbUser {
    accessToken: string;
    userID: string;
    expiresIn: number;
}
