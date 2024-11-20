export interface Books {
    bookEntityID: number
    name: string
    description: string
    price: number
    image: string
    quantity: number
    imagePath: string;
  }

export interface LoginRequest {
    email: string;
    password: string;
}

export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface Subscribe {
  userID: number
  bookID: number
}

export interface Subscription {
  bookEntityID: number
  name: string
  price: number
  description: string
  imagePath: string
}

export interface SubscriptionResponse {
  subscriptions: Subscription[];
}
