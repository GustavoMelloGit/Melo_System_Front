import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/config/firebase";
import { errorHandler } from "../../../lib/utils/error";
import { SignInValues } from "../types";
import { SignInResponse } from "../types/service";

export async function signInService(values: SignInValues): Promise<SignInResponse> {
    try {
        const { user } = await signInWithEmailAndPassword(auth, values.email, values.password)
        return {
            data: {
                ...user,
                isAuthenticated: true
            },
            error: null
        }
    } catch (e: any) {
        return {
            error: errorHandler(e),
            data: null
        }
    }
}