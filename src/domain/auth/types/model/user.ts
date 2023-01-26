import { type User } from "firebase/auth";

export type UserModel = User & {
    isAuthenticated: boolean;
}