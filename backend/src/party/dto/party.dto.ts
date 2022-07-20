import { UserDetails } from 'src/user/user-details.interface';

export class CreatePartyDto {
  name: string;
  description?: string;
  owner?: UserDetails;
  limit?: number;
  members?: Array<UserDetails>;
}
export type UpdatePartyDTO = Partial<CreatePartyDto>;
