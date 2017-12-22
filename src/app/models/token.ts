export interface Token {
    token: string;
    user?: {
        pk: string;
        name: string;
        email: string;
    };
}
