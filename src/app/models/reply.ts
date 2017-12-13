export interface Reply {
    count: number;
    next: string;
    previous: string;
    results: Result[];
}

export interface Result {
    pk: number;
    author: Author[];
    restaurant: number;
    star_rate: number;
    comment: string;
}

export interface Author {
    pk: number;
    name: string;
    email: string;
}

