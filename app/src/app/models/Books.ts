export interface Book {
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

export interface BookSubscriptionResponse {
  success: boolean
  data: BookSubscription[]
}

export interface BookSubscription {
  subscriptionId: number
  book: Book
  subscriptionDate: string
  unsubscriptionDate: string
}


// changes
export interface RegisterReponse {
  message: string
  success: boolean
  user: RegisterResponseUser
}

export interface RegisterResponseUser {
  email: string
  firstName: string
  lastName: string
  userId: number
}

export interface LoginResponse {
  message: string
  success: boolean
  user: LoginReponseUser
}

export interface LoginReponseUser{
  token: string
  email: string
  userId: number;
}

export interface PasswordReset {
  email: string
  password: string
  confirmPassword: string
}

export interface PasswordResetResponse {
  success: boolean
  message: string
}



