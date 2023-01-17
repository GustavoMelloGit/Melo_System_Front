import { UseFormReturn } from "react-hook-form";
import { SignInValues } from "../..";

export type SignInView = {
    form: UseFormReturn<SignInValues, any>;
    handleSubmit: () => Promise<void>
}