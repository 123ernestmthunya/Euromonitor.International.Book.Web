export interface Books {
    bookID: number
    name: string
    description: string
    price: number
    image: string
    quantity: number
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
  