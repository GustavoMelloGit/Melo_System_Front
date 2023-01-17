import { ServiceResponse } from "../../../../lib/utils/service";
import { AuthContextType } from "../context/auth";

export type SignInResponse = ServiceResponse<AuthContextType['user']>