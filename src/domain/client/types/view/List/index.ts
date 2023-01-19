import { ClientModel } from "../../model/Client";

export type ClientsListView = {
    data: ClientModel[] | undefined;
    error: Error | undefined;
    isLoading: boolean;
}