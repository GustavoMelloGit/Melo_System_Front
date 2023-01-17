import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { errorHandler } from "../../../lib/utils/error";
import { SignInValues } from "../types";
import { SignInResponse } from "../types/service";

export async function signInService(values: SignInValues): Promise<SignInResponse> {
    try {
        const { user } = await signInWithEmailAndPassword(auth, values.email, values.password)
        return {
            data: user,
            error: null
        }
    } catch (e) {
        return {
            error: errorHandler(e),
            data: null
        }
    }
}