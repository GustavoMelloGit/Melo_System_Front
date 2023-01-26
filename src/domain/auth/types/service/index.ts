import { type ServiceResponse } from "../../../../shared/types/utils/service";
import { type AuthContextType } from "../context/auth";

export type SignInResponse = ServiceResponse<AuthContextType['user']>