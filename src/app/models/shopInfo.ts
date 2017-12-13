export interface shopInfo {
  pk: number;
  name: string;
  address: string;
  geolocation: string;
  contact_number: number;
  description: string;
  restaurant_type: string;
  average_price: string;
  thumbnail: string;
  menu: string;
  business_hours: string;
  star_rate: number;
  maximum_party: number;
  owner: {
    pk: number;
    name: string;
    email: string;
  },
  images: any;
}

export interface timeList {
  pk : number;
  restaurant : number,
  acceptable_size_of_party: number,
  price : number,
  time : string,
  date : string
}

