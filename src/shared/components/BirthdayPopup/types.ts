import { type ClientModel } from '../../../domain/client/types/model/Client'

export type BirthdayPerson = Pick<ClientModel, 'id' | 'name' | 'profileImage' | 'nickname'>
