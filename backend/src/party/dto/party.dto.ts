import { UserDetails } from 'src/user/user-details.interface';

export class CreatePartyDto {
  name: string;
  description?: string;
  owner?: string;
  limit?: number;
  members?: Array<string>;
}
export type UpdatePartyDTO = Partial<CreatePartyDto>;
