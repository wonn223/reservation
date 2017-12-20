export interface SearchedVal {
    count: number;
    results: Restaurant[];
}

export interface Restaurant {
    pk: number;
    name: string;
    address: string;
    geolocation: string;
    restaurant_type: string;
    average_price: string;
    thumbnail: string;
    star_rate: string;
}
