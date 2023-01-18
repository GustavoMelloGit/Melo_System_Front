import { SignInValues } from "..";
import { UserModel } from "../model/user";


export type AuthContextType = {
    user: UserModel;
    signIn: AuthSignIn;
    signOut: AuthSignOut;
}

export type AuthSignIn = (values: SignInValues) => Promise<void>;
export type AuthSignOut = () => Promise<void>;