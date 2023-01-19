import { ServiceResponse } from "../../../../shared/types/utils/service";
import { AuthContextType } from "../context/auth";

export type SignInResponse = ServiceResponse<AuthContextType['user']>