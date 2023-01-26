import { type UseFormReturn } from "react-hook-form";
import { type SignInValues } from "../..";

export type SignInView = {
    form: UseFormReturn<SignInValues, any>;
    handleSubmit: () => Promise<void>
}